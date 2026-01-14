package com.slangbridge.backend.dto;

public record QuizAnswerRequest(
        String term,
        String selectedOption
) {}
