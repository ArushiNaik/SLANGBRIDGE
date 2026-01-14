package com.slangbridge.backend.controller;

import com.slangbridge.backend.dto.QuizQuestion;
import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/quiz")
@CrossOrigin(origins = "*")
public class QuizController {

    private final SlangRepository repo;

    public QuizController(SlangRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/multiple-choice")
    public QuizQuestion generateQuizQuestion() {

        // get 4 random slang entries
        List<Slang> random = repo.getRandomSlangsLimit10(PageRequest.of(0, 4));

        if (random.size() < 4) {
            throw new RuntimeException("Not enough slang entries in DB.");
        }

        Slang correct = random.get(0);

        List<String> options = random.stream()
                .map(Slang::getDefinition)
                .toList();

        // shuffle options
        Collections.shuffle(options);

        return new QuizQuestion(
                correct.getTerm(),
                correct.getDefinition(),
                options
        );
    }
}
