package org.kie.kogito.explainability.model;

import java.util.List;

/**
 * The output generated by a {@link PredictionProvider}.
 * A prediction output is composed by at least one {@link Output}.
 */
public class PredictionOutput {

    private final List<Output> outputs;

    public PredictionOutput(List<Output> outputs) {
        this.outputs = outputs;
    }

    public List<Output> getOutputs() {
        return outputs;
    }
}
