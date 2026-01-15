package com.slangbridge.backend.service;

import com.slangbridge.backend.dto.QuizAnswerRequest;
import com.slangbridge.backend.dto.QuizAnswerResponse;
import com.slangbridge.backend.dto.QuizQuestion;
import com.slangbridge.backend.dto.QuizSession;
import com.slangbridge.backend.model.Slang;
import com.slangbridge.backend.repository.SlangRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class SlangQuizService {

    private final SlangRepository repo;
    private final Random random = new Random();

    public SlangQuizService(SlangRepository repo) {
        this.repo = repo;
    }

    /** Generate a single multiple-choice question */
    public QuizQuestion generateQuestion() {
        List<Slang> all = repo.findAll();
        if (all.size() < 4) {
            throw new RuntimeException("Not enough slang terms in DB.");
        }

        // pick correct term randomly
        Slang correct = all.get(random.nextInt(all.size()));

        // pick 3 wrong options
        List<String> wrongOptions = all.stream()
                .filter(s -> !s.getId().equals(correct.getId()))
                .map(Slang::getDefinition)
                .distinct()
                .collect(Collectors.toList());

        Collections.shuffle(wrongOptions);
        wrongOptions = wrongOptions.stream().limit(3).toList();

        List<String> options = new ArrayList<>(wrongOptions);
        options.add(correct.getDefinition());
        Collections.shuffle(options);

        return new QuizQuestion(correct.getTerm(), correct.getDefinition(), options);
    }

    /** Generate a quiz session of size n */
    public QuizSession generateQuizSession(int size) {
        List<Slang> all = new ArrayList<>(repo.findAll());
        if (all.size() < 4) {
            throw new RuntimeException("Not enough slang terms in DB.");
        }

        Collections.shuffle(all);
        List<QuizQuestion> questions = new ArrayList<>();

        for (int i = 0; i < size; i++) {
            Slang correct = all.get(i % all.size());

            List<String> wrongOptions = all.stream()
                    .filter(s -> !s.getId().equals(correct.getId()))
                    .map(Slang::getDefinition)
                    .distinct()
                    .collect(Collectors.toList());

            Collections.shuffle(wrongOptions);
            wrongOptions = wrongOptions.stream().limit(3).toList();

            List<String> options = new ArrayList<>(wrongOptions);
            options.add(correct.getDefinition());
            Collections.shuffle(options);

            questions.add(new QuizQuestion(correct.getTerm(), correct.getDefinition(), options));
        }

        return new QuizSession(questions, size);
    }

    /** Safely check answer */
    public QuizAnswerResponse checkAnswer(QuizAnswerRequest req) {
        return repo.findByTermIgnoreCase(req.term())
                .map(slang -> {
                    boolean isCorrect = slang.getDefinition().equalsIgnoreCase(req.selectedOption());
                    return new QuizAnswerResponse(isCorrect, slang.getDefinition());
                })
                .orElseGet(() -> new QuizAnswerResponse(false, null)); // never crash
    }
}
