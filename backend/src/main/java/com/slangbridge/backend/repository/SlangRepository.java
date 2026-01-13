package com.slangbridge.backend.repository;

import com.slangbridge.backend.model.Slang;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SlangRepository extends JpaRepository<Slang, Long> {
    Optional<Slang> findByTermIgnoreCase(String term);
}
