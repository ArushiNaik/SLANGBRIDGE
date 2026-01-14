package com.slangbridge.backend.dto;

public record QuizAnswerResponse(
        boolean correct,
        String correctAnswer
) {}
