package com.slangbridge.backend.dto;

import java.util.List;

public record QuizQuestion(
        String prompt,
        String correctAnswer,
        List<String> options
) {}

