package com.slangbridge.backend.repository;

import com.slangbridge.backend.model.Slang;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface SlangRepository extends JpaRepository<Slang, Long> {
    Optional<Slang> findByTermIgnoreCase(String term);

    // New method for autocomplete
    List<Slang> findTop10ByTermStartingWithIgnoreCase(String prefix);


    @Query("SELECT s FROM Slang s ORDER BY function('RAND')")
    List<Slang> getRandomSlangsLimit10(org.springframework.data.domain.Pageable pageable);

}

