import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  RefreshControl,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useFeed } from "../../hooks/useFeed";
import { Header } from "../../components/Header";
import { Post } from "../../types";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from "../../styles/theme";

export default function FeedScreen() {
  const { posts, loading, toggleLikeLocal, addPost, reload } = useFeed();
  const [modalVisible, setModalVisible] = useState(false);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="FEED" />

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={reload} />
        }
        contentContainerStyle={styles.lista}
      >
        {posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            onLike={() => toggleLikeLocal(post.id)}
          />
        ))}
      </ScrollView>

      {/* Botão flutuante para criar post */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.85}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal de criação de post */}
      <CreatePostModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={(data) => {
          addPost(data);
          setModalVisible(false);
        }}
      />
    </View>
  );
}

// ─── Modal de Novo Post ───────────────────────────────────────────────────────

function CreatePostModal({
  visible,
  onClose,
  onSubmit,
}: {
  visible: boolean;
  onClose: () => void;
  onSubmit: (data: {
    username: string;
    style: string;
    description: string;
    imageUri: string;
  }) => void;
}) {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [styleTag, setStyleTag] = useState("");
  const [description, setDescription] = useState("");

  function resetForm() {
    setImageUri(null);
    setUsername("");
    setStyleTag("");
    setDescription("");
  }

  function fechar() {
    resetForm();
    onClose();
  }

  async function escolherDaGaleria() {
    const permissao = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissao.granted) {
      alert("Precisamos de permissão para acessar suas fotos.");
      return;
    }

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImageUri(resultado.assets[0].uri);
    }
  }

  async function tirarFoto() {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissao.granted) {
      alert("Precisamos de permissão para acessar a câmera.");
      return;
    }

    const resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 5],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setImageUri(resultado.assets[0].uri);
    }
  }

  function handleSubmit() {
    if (!imageUri) {
      alert("Selecione uma foto para postar.");
      return;
    }
    if (!username.trim() || !styleTag.trim()) {
      alert("Preencha seu usuário e o estilo do look.");
      return;
    }

    onSubmit({
      username: username.trim(),
      style: styleTag.trim().toUpperCase(),
      description: description.trim(),
      imageUri,
    });

    resetForm();
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={fechar}
    >
      <View style={styles.modalOverlay}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.modalBox}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            {/* Header */}
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>NOVO LOOK</Text>
              <TouchableOpacity onPress={fechar}>
                <Text style={styles.modalClose}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Preview / seletor de imagem */}
            {imageUri ? (
              <TouchableOpacity onPress={escolherDaGaleria} activeOpacity={0.9}>
                <Image source={{ uri: imageUri }} style={styles.previewImage} />
                <Text style={styles.trocarFotoText}>
                  TOCAR PARA TROCAR A FOTO
                </Text>
              </TouchableOpacity>
            ) : (
              <View style={styles.imagePickerRow}>
                <TouchableOpacity
                  style={styles.imagePickerBtn}
                  onPress={escolherDaGaleria}
                >
                  <Text style={styles.imagePickerIcon}>🖼️</Text>
                  <Text style={styles.imagePickerText}>GALERIA</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.imagePickerBtn}
                  onPress={tirarFoto}
                >
                  <Text style={styles.imagePickerIcon}>📷</Text>
                  <Text style={styles.imagePickerText}>CÂMERA</Text>
                </TouchableOpacity>
              </View>
            )}

            {/* Campos */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>SEU USUÁRIO</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: ana_minimalista"
                placeholderTextColor={COLORS.textSecondary}
                value={username}
                onChangeText={setUsername}
                autoCapitalize="none"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>ESTILO DO LOOK</Text>
              <TextInput
                style={styles.input}
                placeholder="ex: MINIMALISTA"
                placeholderTextColor={COLORS.textSecondary}
                value={styleTag}
                onChangeText={setStyleTag}
                autoCapitalize="characters"
              />
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>DESCRIÇÃO</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Conte sobre o look..."
                placeholderTextColor={COLORS.textSecondary}
                value={description}
                onChangeText={setDescription}
                multiline
                numberOfLines={3}
              />
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>PUBLICAR</Text>
            </TouchableOpacity>

            <View style={{ height: 24 }} />
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

// ─── Card de Post ──────────────────────────────────────────────────────────────

function PostCard({ post, onLike }: { post: Post; onLike: () => void }) {
  const initials = post.username.slice(0, 2).toUpperCase();

  return (
    <View style={styles.card}>
      {/* Header do post */}
      <View style={styles.postHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <View style={styles.postInfo}>
          <Text style={styles.username}>{post.username}</Text>
          <View style={styles.styleBadge}>
            <Text style={styles.styleBadgeText}>{post.style}</Text>
          </View>
        </View>
        <Text style={styles.timestamp}>{post.timestamp}</Text>
      </View>

      {/* Imagem (se tiver) */}
      {post.imageUri ? (
        <Image
          source={{ uri: post.imageUri }}
          style={styles.postImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>{post.style}</Text>
        </View>
      )}

      {/* Rodapé */}
      <View style={styles.postFooter}>
        {/* Like */}
        <TouchableOpacity onPress={onLike} style={styles.likeBtn}>
          <Text style={styles.likeEmoji}>{post.liked ? "♥" : "♡"}</Text>
          <Text style={[styles.likeCount, post.liked && styles.likeCountAtivo]}>
            {post.likes}
          </Text>
        </TouchableOpacity>

        {/* Reactions */}
        <View style={styles.reactions}>
          {post.reactions.map((r) => (
            <View key={r.emoji} style={styles.reaction}>
              <Text style={styles.reactionEmoji}>{r.emoji}</Text>
              <Text style={styles.reactionCount}>{r.count}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Descrição */}
      {post.description ? (
        <View style={styles.descricaoContainer}>
          <Text style={styles.descricaoUsername}>{post.username} </Text>
          <Text style={styles.descricaoText}>{post.description}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  lista: { paddingBottom: SPACING.xxl },
  card: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: SPACING.md,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.lg,
    gap: SPACING.md,
  },
  avatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: "700",
  },
  postInfo: { flex: 1 },
  username: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: "700",
    color: COLORS.text,
  },
  styleBadge: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.full,
    paddingHorizontal: SPACING.sm,
    paddingVertical: 2,
    marginTop: 2,
  },
  styleBadgeText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.textSecondary,
  },
  timestamp: { fontSize: TYPOGRAPHY.fontSize.xs, color: COLORS.textSecondary },
  postImage: { width: "100%", height: 300 },
  imagePlaceholder: {
    width: "100%",
    height: 260,
    backgroundColor: COLORS.backgroundSecondary,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: COLORS.border,
  },
  imagePlaceholderText: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.widest,
    color: COLORS.border,
  },
  postFooter: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    gap: SPACING.xl,
  },
  likeBtn: { flexDirection: "row", alignItems: "center", gap: SPACING.xs },
  likeEmoji: { fontSize: 22, color: COLORS.text },
  likeCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: "600",
    color: COLORS.text,
  },
  likeCountAtivo: { color: "#E63946" },
  reactions: { flexDirection: "row", gap: SPACING.lg },
  reaction: { flexDirection: "row", alignItems: "center", gap: SPACING.xs },
  reactionEmoji: { fontSize: 16 },
  reactionCount: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
  },
  descricaoContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.lg,
  },
  descricaoUsername: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    fontWeight: "700",
    color: COLORS.text,
  },
  descricaoText: { fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.text },

  // ── FAB ──────────────────────────────────────────────────────────────────
  fab: {
    position: "absolute",
    right: SPACING.xl,
    bottom: SPACING.xxl,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 6,
  },
  fabText: {
    color: COLORS.white,
    fontSize: 28,
    lineHeight: 30,
    fontWeight: "300",
  },

  // ── Modal ────────────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  modalBox: {
    backgroundColor: COLORS.background,
    borderTopLeftRadius: RADIUS.lg,
    borderTopRightRadius: RADIUS.lg,
    padding: SPACING.xl,
    maxHeight: "90%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: SPACING.lg,
  },
  modalTitle: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
  },
  modalClose: {
    fontSize: TYPOGRAPHY.fontSize.lg,
    color: COLORS.textSecondary,
  },
  imagePickerRow: {
    flexDirection: "row",
    gap: SPACING.md,
    marginBottom: SPACING.xl,
  },
  imagePickerBtn: {
    flex: 1,
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.backgroundSecondary,
  },
  imagePickerIcon: { fontSize: 28, marginBottom: SPACING.xs },
  imagePickerText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  previewImage: {
    width: "100%",
    height: 280,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.xs,
    backgroundColor: COLORS.backgroundSecondary,
  },
  trocarFotoText: {
    textAlign: "center",
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.textSecondary,
    marginBottom: SPACING.xl,
  },
  formGroup: { marginBottom: SPACING.lg },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: SPACING.sm,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.text,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  submitBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    paddingVertical: SPACING.lg,
    alignItems: "center",
    marginTop: SPACING.sm,
  },
  submitBtnText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.sm,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    fontWeight: "700",
  },
});
