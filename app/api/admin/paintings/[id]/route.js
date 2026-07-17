import { supabaseAdmin } from "@/lib/supabase";
import { deleteImage } from "@/lib/r2";

export async function PATCH(request, { params }) {
  const updates = await request.json();
  const db = supabaseAdmin();

  const { data, error } = await db
    .from("paintings")
    .update(updates)
    .eq("id", params.id)
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ painting: data });
}

export async function DELETE(_request, { params }) {
  const db = supabaseAdmin();

  const { data: painting } = await db
    .from("paintings")
    .select("image_key")
    .eq("id", params.id)
    .single();

  const { error } = await db.from("paintings").delete().eq("id", params.id);
  if (error) return Response.json({ error: error.message }, { status: 500 });

  if (painting?.image_key) {
    try {
      await deleteImage(painting.image_key);
    } catch (err) {
      console.error("Failed to delete image from R2:", err);
    }
  }

  return Response.json({ ok: true });
}
