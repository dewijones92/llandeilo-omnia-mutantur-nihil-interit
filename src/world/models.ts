import { ImportMeshAsync, Matrix, Mesh, Vector3, VertexBuffer, type Scene } from './babylon.ts';
import { solidMaterial } from './meshkit.ts';

export interface LoadedModel {
  readonly mesh: Mesh;
  readonly anchors: ReadonlyMap<string, Vector3>;
}

export async function loadModel(
  scene: Scene,
  url: string,
  unitsPerMetre: number,
): Promise<LoadedModel | undefined> {
  const started = performance.now();
  try {
    const result = await ImportMeshAsync(url, scene);
    const parts = result.meshes.filter((m): m is Mesh => m instanceof Mesh && m.getTotalVertices() > 0);
    for (const m of result.meshes) m.computeWorldMatrix(true);
    const mirrored = parts.some((p) => p.getWorldMatrix().determinant() < 0);
    const raw = new Map<string, Vector3>();
    for (const node of result.transformNodes) {
      node.computeWorldMatrix(true);
      raw.set(node.name, node.getAbsolutePosition().clone());
    }
    const merged = Mesh.MergeMeshes(parts, true, true);
    for (const m of result.meshes) if (!m.isDisposed()) m.dispose();
    for (const n of result.transformNodes) n.dispose();
    if (!merged) {
      console.warn(`dewidebug model ${url} had no geometry to merge (parts=${parts.length})`);
      return undefined;
    }
    const box = merged.getBoundingInfo().boundingBox;
    const flipped = box.maximumWorld.x > -box.minimumWorld.x;
    const transform = Matrix.Scaling(unitsPerMetre, unitsPerMetre, unitsPerMetre).multiply(
      Matrix.RotationY(flipped ? Math.PI : 0),
    );
    merged.bakeTransformIntoVertices(transform);
    if (mirrored) merged.flipFaces(false);
    merged.name = url;
    if (!merged.isVerticesDataPresent(VertexBuffer.ColorKind))
      console.warn(`dewidebug model ${url} has no vertex colours`);
    merged.material = solidMaterial(scene, `${url}-mat`);
    const anchors = new Map([...raw].map(([name, p]) => [name, Vector3.TransformCoordinates(p, transform)]));
    console.info(
      `dewidebug model loaded ${url} parts=${parts.length} verts=${merged.getTotalVertices()} flipped=${flipped} mirrored=${mirrored} anchors=${[...anchors.keys()].join(',')} in ${Math.round(performance.now() - started)}ms`,
    );
    return { mesh: merged, anchors };
  } catch (err: unknown) {
    console.warn(`dewidebug model load failed ${url}`, err);
    return undefined;
  }
}
