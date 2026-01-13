package com.slangbridge.backend.model;

import lombok.Generated;

@Generated
public class SlangBuilder {
    @Generated
    private Long id;
    @Generated
    private String term;
    @Generated
    private String definition;
    @Generated
    private String example;

    @Generated
    SlangBuilder() {
    }

    @Generated
    public SlangBuilder id(final Long id) {
        this.id = id;
        return this;
    }

    @Generated
    public SlangBuilder term(final String term) {
        this.term = term;
        return this;
    }

    @Generated
    public SlangBuilder definition(final String definition) {
        this.definition = definition;
        return this;
    }

    @Generated
    public SlangBuilder example(final String example) {
        this.example = example;
        return this;
    }

    @Generated
    public Slang build() {
        return new Slang(this.id, this.term, this.definition, this.example);
    }

    @Generated
    public String toString() {
        return "Slang.SlangBuilder(id=" + this.id + ", term=" + this.term + ", definition=" + this.definition + ", example=" + this.example + ")";
    }
}
