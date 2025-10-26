
'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export function PropertyEvaluatorAI() {
    const [propertyDetails, setPropertyDetails] = useState('');
    const [evaluation, setEvaluation] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const handleEvaluate = async () => {
        setLoading(true);
        // In a real application, you would call a dedicated AI flow to evaluate the property.
        // For now, we will just simulate the process.
        await new Promise(resolve => setTimeout(resolve, 2000));
        setEvaluation({
            title: '123 Main St - Property Evaluation',
            summary: 'An AI-powered evaluation of the property at 123 Main St.',
            estimatedValue: 'AED 2,500,000',
            recommendations: [
                'Repaint the interior walls.',
                'Upgrade the kitchen appliances.',
                'Stage the property for showings.',
            ],
        });
        setLoading(false);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Property Evaluator AI</CardTitle>
            </CardHeader>
            <CardContent>
                <Textarea
                    value={propertyDetails}
                    onChange={(e) => setPropertyDetails(e.target.value)}
                    placeholder="Enter the details of the property..."
                    className="mb-4"
                />
                <Button onClick={handleEvaluate} disabled={loading}>
                    {loading ? 'Evaluating...' : 'Evaluate Property'}
                </Button>
                {evaluation && (
                    <div className="mt-4">
                        <h4 className="font-semibold">{evaluation.title}</h4>
                        <p className="text-sm">{evaluation.summary}</p>
                        <p className="text-sm mt-2"><strong>Estimated Value:</strong> {evaluation.estimatedValue}</p>
                        <h5 className="font-semibold mt-2">Recommendations</h5>
                        <ul className="list-disc pl-5 mt-1">
                            {evaluation.recommendations.map((rec: string, index: number) => (
                                <li key={index} className="text-sm">{rec}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
