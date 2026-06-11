import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  LayoutAnimation,
  Platform,
  UIManager,
  Image,
  ImageBackground,
} from "react-native";
import { Header } from "../../components/Header";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from "../../styles/theme";
import { EstiloTipo } from "../../types";
import { ESTILOS } from "../../utils/quizData";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Filtro = "TODOS" | EstiloTipo;

const FILTROS: { label: string; value: Filtro }[] = [
  { label: "TODOS", value: "TODOS" },
  { label: "MINIMALISTA", value: "minimalista" },
  { label: "STREETWEAR", value: "streetwear" },
  { label: "CLÁSSICO", value: "classico" },
  { label: "BOHO", value: "boho" },
  { label: "AVANT-GARDE", value: "avant" },
];

export default function TrendsScreen() {
  const [filtro, setFiltro] = useState<Filtro>("TODOS");
  const [expandido, setExpandido] = useState<EstiloTipo | null>(null);

  const estilosVisiveis =
    filtro === "TODOS"
      ? (Object.entries(ESTILOS) as [
          EstiloTipo,
          (typeof ESTILOS)[EstiloTipo],
        ][])
      : ([[filtro, ESTILOS[filtro]]] as [
          EstiloTipo,
          (typeof ESTILOS)[EstiloTipo],
        ][]);

  const handleFiltro = (f: Filtro) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setFiltro(f);
    setExpandido(null);
  };

  const toggleExpandido = (tipo: EstiloTipo) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandido((atual) => (atual === tipo ? null : tipo));
  };

  return (
    <View style={styles.screen}>
      <Header title="TENDÊNCIAS" subtitle="MODA 2025" />

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtrosContainer}
        contentContainerStyle={styles.filtrosContent}
      >
        {FILTROS.map((f) => {
          const ativo = filtro === f.value;
          return (
            <TouchableOpacity
              key={f.value}
              activeOpacity={0.7}
              onPress={() => handleFiltro(f.value)}
              style={[styles.filtroBtn, ativo && styles.filtroBtnAtivo]}
            >
              <Text
                style={[styles.filtroText, ativo && styles.filtroTextAtivo]}
              >
                {f.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Cards de tendência */}
      <ScrollView
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      >
        {estilosVisiveis.map(([tipo, estilo]) => {
          const aberto = filtro !== "TODOS" || expandido === tipo;

          return (
            <TouchableOpacity
              key={tipo}
              style={styles.card}
              activeOpacity={filtro === "TODOS" ? 0.9 : 1}
              onPress={() => filtro === "TODOS" && toggleExpandido(tipo)}
            >
              {/* Imagem de capa */}
              <ImageBackground
                source={{ uri: estilo.imagem }}
                style={styles.capa}
                imageStyle={styles.capaImagem}
              >
                <View style={styles.capaOverlay} />
                <View style={styles.capaConteudo}>
                  <View style={styles.capaIconeWrap}>
                    <Text style={styles.capaIcone}>{estilo.icone}</Text>
                  </View>
                  <Text style={styles.capaTitulo}>{estilo.label}</Text>
                </View>
                {filtro === "TODOS" && (
                  <View style={styles.chevronWrap}>
                    <Text
                      style={[styles.chevron, aberto && styles.chevronAberto]}
                    >
                      ⌄
                    </Text>
                  </View>
                )}
              </ImageBackground>

              <View style={styles.cardBody}>
                <Text
                  style={styles.cardDescricao}
                  numberOfLines={aberto ? undefined : 2}
                >
                  {estilo.descricao}
                </Text>

                {/* Mini paleta sempre visível */}
                <View style={styles.miniPaletaRow}>
                  {estilo.feminino.paleta.slice(0, 5).map((cor, i) => (
                    <View
                      key={`${cor}-${i}`}
                      style={[
                        styles.miniCor,
                        { backgroundColor: cor, marginLeft: i === 0 ? 0 : -8 },
                      ]}
                    />
                  ))}
                  <Text style={styles.miniPaletaLabel}>
                    {estilo.feminino.tendencias.length} tendências
                  </Text>
                </View>

                {aberto && (
                  <View>
                    {/* Origem / contexto */}
                    <Text style={styles.sectionLabel}>SOBRE O ESTILO</Text>
                    <Text style={styles.paragrafo}>{estilo.origem}</Text>

                    {/* Tendências em destaque */}
                    <Text style={styles.sectionLabel}>TENDÊNCIAS</Text>
                    <View style={styles.tagsRow}>
                      {estilo.feminino.tendencias.map((t) => (
                        <View key={t} style={styles.tag}>
                          <Text style={styles.tagText}>{t}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Ocasiões */}
                    <Text style={styles.sectionLabel}>QUANDO USAR</Text>
                    <View style={styles.tagsRow}>
                      {estilo.ocasioes.map((o) => (
                        <View key={o} style={styles.tagOutline}>
                          <Text style={styles.tagOutlineText}>{o}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Paleta de cores com hex */}
                    <Text style={styles.sectionLabel}>PALETA</Text>
                    <View style={styles.paletaRow}>
                      {estilo.feminino.paleta.map((cor) => (
                        <View key={cor} style={styles.paletaItem}>
                          <View
                            style={[
                              styles.corCirculo,
                              { backgroundColor: cor },
                            ]}
                          />
                          <Text style={styles.corHex}>{cor.toUpperCase()}</Text>
                        </View>
                      ))}
                    </View>

                    {/* Peças-chave */}
                    <Text style={styles.sectionLabel}>PEÇAS-CHAVE</Text>
                    {estilo.feminino.pecasChave.map((p) => (
                      <View key={p} style={styles.pecaRow}>
                        <View style={styles.pecaBullet} />
                        <Text style={styles.pecaText}>{p}</Text>
                      </View>
                    ))}

                    {/* Dica de styling */}
                    <View style={styles.dicaBox}>
                      <Text style={styles.dicaLabel}>💡 DICA</Text>
                      <Text style={styles.dicaTexto}>{estilo.dica}</Text>
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: COLORS.background },

  filtrosContainer: { borderBottomWidth: 1, borderBottomColor: COLORS.border },
  filtrosContent: {
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    gap: SPACING.sm,
  },
  filtroBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.full,
  },
  filtroBtnAtivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filtroText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  filtroTextAtivo: { color: COLORS.white },

  lista: { padding: SPACING.xl, gap: SPACING.lg },

  card: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.lg ?? RADIUS.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },

  // Imagem de capa
  capa: {
    height: 160,
    width: "100%",
    justifyContent: "flex-end",
  },
  capaImagem: {
    resizeMode: "cover",
  },
  capaOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  capaConteudo: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    padding: SPACING.lg,
  },
  capaIconeWrap: {
    width: 40,
    height: 40,
    borderRadius: RADIUS.md,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  capaIcone: { fontSize: 20 },
  capaTitulo: {
    fontSize: TYPOGRAPHY.fontSize.lg ?? TYPOGRAPHY.fontSize.md,
    fontWeight: "800",
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: "#FFFFFF",
    textShadowColor: "rgba(0,0,0,0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  chevronWrap: {
    position: "absolute",
    top: SPACING.md,
    right: SPACING.md,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.85)",
    alignItems: "center",
    justifyContent: "center",
  },
  chevron: {
    fontSize: 18,
    color: COLORS.text,
  },
  chevronAberto: {
    transform: [{ rotate: "180deg" }],
    color: COLORS.primary,
  },

  cardBody: { padding: SPACING.xl },

  cardDescricao: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  miniPaletaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: SPACING.lg,
  },
  miniCor: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: COLORS.backgroundSecondary,
  },
  miniPaletaLabel: {
    marginLeft: SPACING.md,
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.textSecondary,
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
  },

  sectionLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
    marginTop: SPACING.lg,
    marginBottom: SPACING.sm,
  },

  paragrafo: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },

  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  tag: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  tagText: {
    color: COLORS.white,
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
    fontWeight: "600",
  },
  tagOutline: {
    borderWidth: 1,
    borderColor: COLORS.border,
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.full,
  },
  tagOutlineText: {
    color: COLORS.textSecondary,
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },

  paletaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
  },
  paletaItem: { alignItems: "center", gap: SPACING.xs },
  corCirculo: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
  },
  corHex: {
    fontSize: 10,
    color: COLORS.textSecondary,
    letterSpacing: TYPOGRAPHY.letterSpacing.normal,
  },

  pecaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.sm,
    marginBottom: SPACING.xs,
  },
  pecaBullet: {
    width: 4,
    height: 4,
    backgroundColor: COLORS.primary,
    borderRadius: 2,
  },
  pecaText: { fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.textSecondary },

  dicaBox: {
    marginTop: SPACING.lg,
    backgroundColor: COLORS.background,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  dicaLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
    marginBottom: SPACING.xs,
  },
  dicaTexto: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
});
