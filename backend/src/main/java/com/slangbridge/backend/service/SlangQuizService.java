package com.slangbridge.backend.service;


import com.slangbridge.backend.dto.QuizAnswerRequest;
import com.slangbridge.backend.dto.QuizAnswerResponse;
import com.slangbridge.backend.dto.QuizQuestion;
import com.slangbridge.backend.dto.QuizSession;
import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

@Service
public class SlangQuizService {
    private final SlangRepository repo;
    private final Random random = new Random();
    public SlangQuizService(SlangRepository repo) {
        this.repo = repo;
    }
    public QuizQuestion generateRecognition() {
        List<Slang> all = repo.findAll();
        Slang correct = all.get(random.nextInt(all.size()));

        //distractors (fallback random)
        List<String> options = all.stream()
                .filter(s -> !s.getId().equals(correct.getId()))
                .map(Slang::getDefinition)
                .distinct()
                .limit(3)
                .collect(Collectors.toList());

        //ensure we have 4 total
        while (options.size() < 3) {
            Slang extra = all.get(random.nextInt(all.size()));
            String d = extra.getDefinition();
            if (!options.contains(d) && !d.equals(correct.getDefinition())) {
                options.add(d);
            }
        }
        // add correct answer and shuffling
        options.add(correct.getDefinition());
        Collections.shuffle(options);
        return new QuizQuestion(
                correct.getTerm(),
                correct.getDefinition(),
                options
        );


    }
    public QuizAnswerResponse checkAnswer(QuizAnswerRequest req) {
        var slang = repo.findByTermIgnoreCase(req.term())
                .orElseThrow(() -> new RuntimeException("Slang not found"));

        boolean isCorrect = slang.getDefinition().equalsIgnoreCase(req.selectedOption());

        return new QuizAnswerResponse(
                isCorrect,
                slang.getDefinition()
        );
    }
    public QuizSession generateQuizSession(int size) {
        var slangs = repo.findAll();

        if (slangs.size() < size) {
            throw new RuntimeException("Not enough slang terms for quiz");
        }

        Collections.shuffle(slangs);

        List<QuizQuestion> questions = slangs.stream()
                .limit(size)
                .map(slang -> {
                    List<String> pool = repo.findAll().stream()
                            .map(Slang::getDefinition)
                            .filter(def -> !def.equals(slang.getDefinition()))
                            .collect(Collectors.toList());

                    Collections.shuffle(pool);

                    List<String> wrongOptions = pool.stream().limit(3).toList();

                    List<String> answers = new ArrayList<>();
                    answers.add(slang.getDefinition());
                    answers.addAll(wrongOptions);
                    Collections.shuffle(answers);

                    return new QuizQuestion(
                            slang.getTerm(),
                            slang.getDefinition(),
                            answers
                    );
                })
                .toList();

        return new QuizSession(questions, size);
    }

}


