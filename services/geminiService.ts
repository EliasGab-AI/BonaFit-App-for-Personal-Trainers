
import { GoogleGenAI, Type } from "@google/genai";
import type { WorkoutSession, StudentProfile, GeminiFeedback, TrainerSummary } from '../types';

const getWorkoutFeedback = async (workout: WorkoutSession): Promise<GeminiFeedback | null> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY environment variable not set.");
    // Return mock data if API key is not available
    return {
      heartRateAnalysis: "Você passou 12 minutos na zona de queima de gordura e 5 minutos na zona de cardio. Ótimo para resistência!",
      distanceFeedback: "Cobrir 5.2 km em 45 minutos é um ritmo excelente. Continue assim para melhorar sua velocidade.",
      overallMotivation: "Você mostrou grande consistência e força hoje. Cada passo é uma vitória!",
      nextWorkoutSuggestion: "Seu batimento cardíaco se recuperou bem. Para o próximo treino, que tal tentar um percurso com mais inclinações para desafiar suas pernas?"
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Você é a BonaFit Personal, uma IA especialista em fitness para um app. Analise os dados do treino de uma usuária e forneça feedback em Português (Brasil).

        Dados do Treino:
        - Duração: ${workout.duration} minutos
        - Distância: ${workout.distance} km
        - Frequência Cardíaca Média: ${workout.avgHeartRate} bpm
        - Frequência Cardíaca Máxima: ${workout.maxHeartRate} bpm
        - Amostras de Frequência Cardíaca (minuto, bpm): ${JSON.stringify(workout.heartRateData)}
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            heartRateAnalysis: { type: Type.STRING, description: "Análise das zonas de frequência cardíaca (ex: queima de gordura, cardio) e o tempo gasto em cada uma." },
            distanceFeedback: { type: Type.STRING, description: "Feedback sobre a distância percorrida e o ritmo." },
            overallMotivation: { type: Type.STRING, description: "Uma mensagem motivacional curta e encorajadora." },
            nextWorkoutSuggestion: { type: Type.STRING, description: "Uma sugestão para o próximo treino ou uma dica de recuperação." }
          },
        },
      }
    });

    const text = response.text.trim();
    return JSON.parse(text) as GeminiFeedback;
  } catch (error) {
    console.error("Error fetching Gemini feedback:", error);
    return null;
  }
};

const getTrainerSummaryForStudents = async (students: StudentProfile[]): Promise<TrainerSummary | null> => {
    if (!process.env.API_KEY) {
      console.error("API_KEY environment variable not set.");
      // Return mock data if API key is not available
      return {
        overallSummary: "A semana foi muito produtiva para suas alunas! Ana e Bia mostraram grande consistência. Carla teve uma pequena queda no volume, vale a pena verificar.",
        alerts: [
          { studentName: "Carla", alert: "Volume de treino diminuiu 30% esta semana." }
        ],
        challengeSuggestion: "Que tal um desafio de 'Mais Tempo na Zona Cardio'? A aluna que passar mais tempo na zona de frequência cardíaca de cardio durante a semana ganha pontos."
      };
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const studentDataSummary = students.map(s => (
          `Aluna: ${s.name}, Total de treinos na semana: ${s.workouts.length}, Distância total: ${s.workouts.reduce((acc, w) => acc + w.distance, 0).toFixed(1)} km, Média de BPM: ${s.workouts.length > 0 ? (s.workouts.reduce((acc, w) => acc + w.avgHeartRate, 0) / s.workouts.length).toFixed(0) : 'N/A'}`
        )).join('\n');

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
              Você é um assistente de IA para uma personal trainer. Analise o resumo semanal das alunas e forneça insights em Português (Brasil).

              Dados das Alunas:
              ${studentDataSummary}

              Com base nestes dados, forneça:
              1. Um resumo geral do desempenho do grupo.
              2. Alertas sobre quaisquer alunas que precisem de atenção (ex: queda de desempenho, risco de overtraining).
              3. Uma sugestão criativa para um desafio semanal para engajar o grupo.
            `,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        overallSummary: { type: Type.STRING, description: "Um resumo geral e conciso do desempenho da turma na semana." },
                        alerts: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    studentName: { type: Type.STRING },
                                    alert: { type: Type.STRING }
                                }
                            },
                            description: "Uma lista de alertas importantes sobre alunas específicas."
                        },
                        challengeSuggestion: { type: Type.STRING, description: "Uma sugestão de desafio semanal para o grupo." }
                    }
                }
            }
        });
        
        const text = response.text.trim();
        return JSON.parse(text) as TrainerSummary;
    } catch (error) {
        console.error("Error fetching trainer summary:", error);
        return null;
    }
};

export const geminiService = {
  getWorkoutFeedback,
  getTrainerSummaryForStudents,
};