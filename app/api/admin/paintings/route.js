import { supabaseAdmin } from "@/lib/supabase";
import { uploadImage } from "@/lib/r2";

export async function GET() {
  const db = supabaseAdmin();
  const { data, error } = await db
    .from("paintings")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ paintings: data });
}

// Accepts multipart/form-data: title, dimensions, medium, year, story, image (file)
export async function POST(request) {
  const form = await request.formData();
  const title = form.get("title");
  const dimensions = form.get("dimensions");
  const medium = form.get("medium");
  const year = form.get("year");
  const story = form.get("story");
  const file = form.get("image");

  if (!title || !file) {
    return Response.json({ error: "Title and image are required." }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const key = `paintings/${Date.now()}-${file.name.replace(/\s+/g, "-")}`;
  const imageUrl = await uploadImage(key, buffer, file.type);

  const db = supabaseAdmin();

  // Put new pieces at the end of the current sort order
  const { data: existing } = await db
    .from("paintings")
    .select("sort_order")
    .order("sort_order", { ascending: false })
    .limit(1);
  const nextSort = existing && existing.length ? existing[0].sort_order + 1 : 0;

  const { data, error } = await db
    .from("paintings")
    .insert({
      title,
      dimensions,
      medium,
      year: year ? Number(year) : null,
      story,
      image_url: imageUrl,
      image_key: key,
      is_published: true,
      sort_order: nextSort,
    })
    .select()
    .single();

  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ painting: data });
}
