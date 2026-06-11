import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from "react-native";
import { useQuiz } from "../../hooks/useQuiz";
import { Button } from "../../components/Button";
import { COLORS, SPACING, TYPOGRAPHY, RADIUS } from "../../styles/theme";
import { ESTILOS } from "../../utils/quizData";

export default function QuizScreen() {
  const {
    fase,
    nome,
    setNome,
    genero,
    setGenero,
    etapa,
    estiloFinal,
    perguntas,
    iniciarQuiz,
    responder,
    reiniciar,
  } = useQuiz();

  const [aba, setAba] = useState<
    "dna" | "acessorios" | "paleta" | "tendencias"
  >("dna");

  // ── FASE: INÍCIO ────────────────────────────────────────────────────────────
  if (fase === "inicio") {
    return (
      <ScrollView contentContainerStyle={styles.center}>
        <Text style={styles.superTitle}>ANÁLISE DE ESTILO</Text>
        <Text style={styles.title}>DESCUBRA SEU{"\n"}DNA DE MODA</Text>
        <View style={styles.divider} />

        <Text style={styles.label}>SEU NOME</Text>
        <TextInput
          value={nome}
          onChangeText={setNome}
          placeholder="Digite seu nome"
          placeholderTextColor={COLORS.textSecondary}
          style={styles.input}
          autoCapitalize="words"
        />

        <Text style={[styles.label, { marginTop: SPACING.xl }]}>
          SELECIONE:
        </Text>
        <View style={styles.generoRow}>
          {(["feminino", "masculino"] as const).map((g) => (
            <TouchableOpacity
              key={g}
              onPress={() => setGenero(g)}
              style={[styles.generoBtn, genero === g && styles.generoBtnAtivo]}
            >
              <Text
                style={[
                  styles.generoText,
                  genero === g && styles.generoTextAtivo,
                ]}
              >
                {g.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Button
          title="INICIAR ANÁLISE"
          onPress={iniciarQuiz}
          fullWidth
          disabled={!nome.trim()}
          style={{ marginTop: SPACING.xxl }}
        />
      </ScrollView>
    );
  }

  // ── FASE: QUIZ ──────────────────────────────────────────────────────────────
  if (fase === "quiz") {
    const pergunta = perguntas[etapa];
    const progresso = (etapa / perguntas.length) * 100;

    return (
      <ScrollView contentContainerStyle={styles.quizContainer}>
        {/* Progress bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progresso}%` }]} />
        </View>

        <Text style={styles.etapaLabel}>
          ETAPA {etapa + 1} DE {perguntas.length}
        </Text>
        <View style={styles.divider} />

        <Text style={styles.perguntaText}>{pergunta.q}</Text>

        {pergunta.opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.tipo}
            onPress={() => responder(opcao.tipo)}
            style={styles.opcaoBtn}
            activeOpacity={0.7}
          >
            <Text style={styles.opcaoText}>{opcao.t}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    );
  }

  // ── FASE: RESULTADO ─────────────────────────────────────────────────────────
  if (!estiloFinal) return null;
  const estilo = ESTILOS[estiloFinal];
  const versao = estilo[genero];

  const ABAS = [
    { key: "dna", label: "SEU DNA" },
    { key: "acessorios", label: "ACESSÓRIOS" },
    { key: "paleta", label: "PALETA" },
    { key: "tendencias", label: "TENDÊNCIAS" },
  ] as const;

  return (
    <ScrollView contentContainerStyle={styles.resultadoContainer}>
      <Text style={styles.superTitle}>ANÁLISE CONCLUÍDA</Text>
      <View style={styles.divider} />

      <Text style={styles.label}>{nome.toUpperCase()}, SEU DNA É:</Text>
      <View style={styles.estiloBox}>
        <Text style={styles.estiloIcone}>{estilo.icone}</Text>
        <Text style={styles.estiloLabel}> {estilo.label} </Text>
        <Text style={styles.estiloIcone}>{estilo.icone}</Text>
      </View>

      {/* Abas */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.abasContainer}
      >
        {ABAS.map((a) => (
          <TouchableOpacity
            key={a.key}
            onPress={() => setAba(a.key)}
            style={[styles.abaBtn, aba === a.key && styles.abaBtnAtiva]}
          >
            <Text
              style={[styles.abaText, aba === a.key && styles.abaTextAtiva]}
            >
              {a.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Conteúdo das abas */}
      {aba === "dna" && (
        <View style={styles.abaConteudo}>
          <Text style={styles.descricaoText}>{estilo.descricao}</Text>
          <Text style={[styles.label, { marginTop: SPACING.xl }]}>
            PEÇAS-CHAVE — VERSÃO {genero.toUpperCase()}
          </Text>
          <View style={styles.pecasGrid}>
            {versao.pecasChave.map((p) => (
              <View key={p} style={styles.pecaCard}>
                <Text style={styles.pecaCardText}>{p}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {aba === "acessorios" && (
        <View style={styles.abaConteudo}>
          {versao.acessorios.map((a) => (
            <View key={a} style={styles.itemRow}>
              <View style={styles.bullet} />
              <Text style={styles.itemText}>{a}</Text>
            </View>
          ))}
        </View>
      )}

      {aba === "paleta" && (
        <View style={styles.abaConteudo}>
          <View style={styles.paletaGrid}>
            {versao.paleta.map((cor, i) => (
              <View key={cor} style={styles.corItem}>
                <View style={[styles.corBloco, { backgroundColor: cor }]} />
                <Text style={styles.corNome}>{versao.nomesCores[i]}</Text>
                <Text style={styles.corHex}>{cor}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {aba === "tendencias" && (
        <View style={styles.abaConteudo}>
          {versao.tendencias.map((t) => (
            <View key={t} style={styles.tendenciaCard}>
              <Text style={styles.tendenciaText}>{t}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Ações */}
      <View style={styles.acoesRow}>
        <Button
          title="REFAZER TESTE"
          onPress={reiniciar}
          variant="outline"
          style={styles.acaoBtn}
        />
        <Button
          title="VER FEED"
          onPress={() => {}}
          variant="primary"
          style={styles.acaoBtn}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Início
  center: {
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  superTitle: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.widest,
    color: COLORS.textSecondary,
    marginBottom: SPACING.sm,
  },
  title: {
    fontSize: TYPOGRAPHY.fontSize.xxxl,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.text,
    lineHeight: 36,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: SPACING.xl,
  },
  label: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
    fontWeight: "600",
    marginBottom: SPACING.md,
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
  generoRow: { flexDirection: "row", gap: SPACING.md },
  generoBtn: {
    flex: 1,
    paddingVertical: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    alignItems: "center",
  },
  generoBtnAtivo: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  generoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  generoTextAtivo: { color: COLORS.white },

  // Quiz
  quizContainer: {
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  progressTrack: {
    height: 3,
    backgroundColor: COLORS.border,
    borderRadius: 2,
    marginBottom: SPACING.xl,
  },
  progressFill: { height: 3, backgroundColor: COLORS.primary, borderRadius: 2 },
  etapaLabel: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.widest,
    color: COLORS.textSecondary,
  },
  perguntaText: {
    fontSize: TYPOGRAPHY.fontSize.xl,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.text,
    marginBottom: SPACING.xl,
    lineHeight: 28,
  },
  opcaoBtn: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.xl,
    marginBottom: SPACING.md,
  },
  opcaoText: {
    fontSize: TYPOGRAPHY.fontSize.sm,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
    fontWeight: "500",
  },

  // Resultado
  resultadoContainer: {
    flexGrow: 1,
    padding: SPACING.xl,
    paddingTop: 60,
    backgroundColor: COLORS.background,
  },
  estiloBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: COLORS.primary,
    borderRadius: RADIUS.sm,
    padding: SPACING.xl,
    marginBottom: SPACING.xl,
  },
  estiloIcone: { fontSize: 20 },
  estiloLabel: {
    fontSize: TYPOGRAPHY.fontSize.xxl,
    fontWeight: "700",
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.text,
  },
  abasContainer: { marginBottom: SPACING.xl },
  abaBtn: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    borderBottomWidth: 2,
    borderBottomColor: "transparent",
    marginRight: SPACING.sm,
  },
  abaBtnAtiva: { borderBottomColor: COLORS.primary },
  abaText: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    letterSpacing: TYPOGRAPHY.letterSpacing.wider,
    color: COLORS.textSecondary,
    fontWeight: "600",
  },
  abaTextAtiva: { color: COLORS.primary },
  abaConteudo: { marginBottom: SPACING.xxl },
  descricaoText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    color: COLORS.textSecondary,
    lineHeight: 24,
  },
  pecasGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.md,
    marginTop: SPACING.md,
  },
  pecaCard: {
    width: "47%",
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pecaCardText: { fontSize: TYPOGRAPHY.fontSize.sm, color: COLORS.text },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
    marginBottom: SPACING.md,
  },
  bullet: {
    width: 6,
    height: 6,
    backgroundColor: COLORS.primary,
    borderRadius: 3,
  },
  itemText: { fontSize: TYPOGRAPHY.fontSize.md, color: COLORS.text },
  paletaGrid: { flexDirection: "row", flexWrap: "wrap", gap: SPACING.lg },
  corItem: { alignItems: "center", width: 60 },
  corBloco: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: SPACING.xs,
  },
  corNome: {
    fontSize: TYPOGRAPHY.fontSize.xs,
    color: COLORS.text,
    fontWeight: "600",
    textAlign: "center",
  },
  corHex: { fontSize: 9, color: COLORS.textSecondary, textAlign: "center" },
  tendenciaCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.sm,
    padding: SPACING.lg,
    marginBottom: SPACING.md,
  },
  tendenciaText: {
    fontSize: TYPOGRAPHY.fontSize.md,
    fontWeight: "600",
    letterSpacing: TYPOGRAPHY.letterSpacing.wide,
    color: COLORS.text,
  },
  acoesRow: { flexDirection: "row", gap: SPACING.md, marginTop: SPACING.sm },
  acaoBtn: { flex: 1 },
});
