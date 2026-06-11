import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { EstiloTipo } from "../types";
import { PERGUNTAS, calcularEstilo } from "../utils/quizData";
import { salvarResultadoQuiz } from "../services/supabase";

type Fase = "inicio" | "quiz" | "resultado";

const pontuacaoInicial: Record<EstiloTipo, number> = {
  minimalista: 0,
  streetwear: 0,
  classico: 0,
  boho: 0,
  avant: 0,
};

export function useQuiz() {
  const [fase, setFase] = useState<Fase>("inicio");
  const [nome, setNome] = useState("");
  const [genero, setGenero] = useState<"feminino" | "masculino">("feminino");
  const [etapa, setEtapa] = useState(0);
  const [pontos, setPontos] = useState<Record<EstiloTipo, number>>({
    ...pontuacaoInicial,
  });
  const [estiloFinal, setEstiloFinal] = useState<EstiloTipo | null>(null);

  function iniciarQuiz() {
    if (!nome.trim()) return;
    setFase("quiz");
    setEtapa(0);
    setPontos({ ...pontuacaoInicial });
  }

  function responder(tipo: EstiloTipo) {
    const novosPontos = { ...pontos, [tipo]: pontos[tipo] + 1 };
    setPontos(novosPontos);

    if (etapa + 1 >= PERGUNTAS.length) {
      const resultado = calcularEstilo(novosPontos);
      setEstiloFinal(resultado);
      setFase("resultado");
      _salvar(resultado);
    } else {
      setEtapa((e) => e + 1);
    }
  }

  async function _salvar(estilo: EstiloTipo) {
    try {
      await AsyncStorage.setItem("@estilo", estilo);
      await AsyncStorage.setItem("@nome", nome);
      await salvarResultadoQuiz(nome, genero, estilo);
    } catch (e) {
      console.error("Erro ao salvar estilo:", e);
    }
  }

  function reiniciar() {
    setFase("inicio");
    setNome("");
    setEtapa(0);
    setPontos({ ...pontuacaoInicial });
    setEstiloFinal(null);
  }

  return {
    fase,
    nome,
    setNome,
    genero,
    setGenero,
    etapa,
    estiloFinal,
    perguntas: PERGUNTAS,
    iniciarQuiz,
    responder,
    reiniciar,
  };
}
