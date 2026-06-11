import { createClient } from "@supabase/supabase-js";
import { Post } from "../types";

// 🔧 Substitua pelos seus dados do painel Supabase (Settings → API)
const SUPABASE_URL = "https://zqxqmwukkprfvwybqjze.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_XhHqExRg8nMmX3vhBz_58g_pBfTOHOh";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── Posts ───────────────────────────────────────────────────────────────────

export async function fetchPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Erro ao buscar posts:", error.message);
    return [];
  }
  return data as Post[];
}

export async function createPost(
  post: Omit<Post, "id" | "liked" | "reactions">,
): Promise<Post | null> {
  const { data, error } = await supabase
    .from("posts")
    .insert([{ ...post, likes: 0, reactions: [] }])
    .select()
    .single();

  if (error) {
    console.error("Erro ao criar post:", error.message);
    return null;
  }
  return data as Post;
}

export async function toggleLike(
  postId: string,
  liked: boolean,
): Promise<void> {
  // Incrementa ou decrementa no banco — adapte conforme sua lógica RLS
  const { error } = await supabase.rpc("toggle_like", {
    post_id: postId,
    like: !liked,
  });
  if (error) console.error("Erro ao dar like:", error.message);
}

// ─── Resultados do Quiz ───────────────────────────────────────────────────────

export async function salvarResultadoQuiz(
  nome: string,
  genero: string,
  estilo: string,
): Promise<void> {
  const { error } = await supabase
    .from("quiz_resultados")
    .insert([{ nome, genero, estilo, created_at: new Date().toISOString() }]);

  if (error) console.error("Erro ao salvar resultado:", error.message);
}
