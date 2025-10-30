#!/usr/bin/env python3
"""
Add Taxonomy IDs to Concept Dependency CSV

Reads the concept dependency CSV and assigns appropriate taxonomy IDs
based on concept labels and position in the concept hierarchy.
"""

import csv
import re
from typing import Dict, List


def assign_taxonomy(concept_id: int, concept_label: str) -> str:
    """Assign taxonomy ID based on concept ID and label."""

    label_lower = concept_label.lower()

    # MATH - Mathematical Foundations (1-20)
    math_keywords = ['number', 'complex', 'imaginary', 'euler', 'phasor',
                     'vector', 'matri', 'algebra', 'calculus', 'derivative',
                     'integral', 'differential', 'partial', 'probability',
                     'random', 'statistical', 'mean', 'variance', 'deviation',
                     'trigonometry', 'exponential', 'function']
    if concept_id <= 20 or any(kw in label_lower for kw in math_keywords):
        return 'MATH'

    # SIG - Signal Fundamentals (21-45)
    sig_keywords = ['signal', 'continuous-time', 'discrete-time', 'analog',
                    'digital', 'periodic', 'aperiodic', 'even', 'odd',
                    'energy signal', 'power signal', 'unit step', 'unit impulse',
                    'sinusoidal', 'exponential signal', 'operation', 'shifting',
                    'scaling', 'amplitude', 'phase', 'time domain', 'frequency domain',
                    'representation']
    if 21 <= concept_id <= 45 or any(kw in label_lower for kw in sig_keywords):
        # Exclude if it's clearly a system concept
        if 'system' not in label_lower and 'filter' not in label_lower:
            return 'SIG'

    # SYS - Systems Theory (46-65)
    sys_keywords = ['system', 'linear', 'time-invariant', 'lti', 'causality',
                    'stability', 'bibo', 'impulse response', 'step response',
                    'frequency response', 'characterization', 'convolution',
                    'superposition', 'transfer', 'pole', 'zero', 'memory',
                    'invertibility', 'feedback', 'feedforward']
    if 46 <= concept_id <= 65 or any(kw in label_lower for kw in sys_keywords):
        return 'SYS'

    # SAMP - Sampling and Quantization (66-80)
    samp_keywords = ['sampling', 'sample', 'nyquist', 'aliasing', 'anti-aliasing',
                     'oversampling', 'undersampling', 'quantization', 'quantization error',
                     'quantization noise', 'sample-and-hold', 'analog-to-digital',
                     'adc', 'a/d']
    if 66 <= concept_id <= 80 or any(kw in label_lower for kw in samp_keywords):
        return 'SAMP'

    # FOUR - Fourier Analysis (81-105)
    four_keywords = ['fourier', 'dft', 'fft', 'harmonic', 'fundamental frequency',
                     'spectral', 'parseval', 'window', 'rectangular window',
                     'hamming', 'hanning', 'leakage', 'zero padding']
    if 81 <= concept_id <= 105 or any(kw in label_lower for kw in four_keywords):
        # Check if it's not a different transform
        if 'laplace' not in label_lower and 'z-transform' not in label_lower and 'wavelet' not in label_lower:
            return 'FOUR'

    # TRANS - Other Transforms (106-120)
    trans_keywords = ['laplace', 'z-transform', 'z-plane', 'unit circle',
                      'bilinear transform', 'short-time', 'stft', 'wavelet',
                      'continuous wavelet', 'discrete wavelet', 'cwt', 'dwt',
                      'region of convergence']
    if 106 <= concept_id <= 120 or any(kw in label_lower for kw in trans_keywords):
        return 'TRANS'

    # FILT - Filtering Fundamentals (121-145)
    filt_keywords = ['filter', 'filtering', 'low-pass', 'high-pass', 'band-pass',
                     'band-stop', 'all-pass', 'ideal filter', 'practical filter',
                     'filter order', 'cutoff', 'bandwidth', 'rolloff', 'passband',
                     'stopband', 'transition', 'ripple', 'attenuation', 'fir',
                     'iir', 'filter impulse', 'filter stability', 'phase response',
                     'phase distortion', 'group delay']
    if 121 <= concept_id <= 145 or any(kw in label_lower for kw in filt_keywords):
        # Check if it's not filter design
        design_keywords = ['design', 'butterworth', 'chebyshev', 'elliptic',
                          'bessel', 'parks-mcclellan', 'specification']
        if not any(kw in label_lower for kw in design_keywords):
            return 'FILT'

    # FDES - Filter Design (146-165)
    fdes_keywords = ['filter design', 'filter specification', 'butterworth',
                     'chebyshev', 'elliptic', 'bessel', 'window method',
                     'frequency sampling', 'parks-mcclellan', 'optimal',
                     'pole-zero placement', 'digital filter design',
                     'analog filter design', 'filter implementation',
                     'direct form', 'cascade', 'parallel', 'lattice',
                     'polyphase']
    if 146 <= concept_id <= 165 or any(kw in label_lower for kw in fdes_keywords):
        return 'FDES'

    # ADV - Advanced DSP Topics (166-180)
    adv_keywords = ['adaptive', 'lms', 'rls', 'wiener', 'kalman',
                    'correlation', 'autocorrelation', 'cross-correlation',
                    'power spectral density', 'energy spectral density',
                    'psd', 'esd', 'spectrogram', 'compression', 'lossless',
                    'lossy', 'multirate']
    if 166 <= concept_id <= 180 or any(kw in label_lower for kw in adv_keywords):
        return 'ADV'

    # APP - Applications (181-190)
    app_keywords = ['audio', 'speech', 'music', 'image', 'video',
                    'communication', 'modulation', 'biomedical', 'radar',
                    'sonar', 'processing']
    if 181 <= concept_id <= 190 or any(kw in label_lower for kw in app_keywords):
        # Must have an application domain keyword
        domain_keywords = ['audio', 'speech', 'music', 'image', 'video',
                          'biomedical', 'radar', 'sonar', 'communication']
        if any(kw in label_lower for kw in domain_keywords):
            return 'APP'

    # AI - AI and Machine Learning (191-200)
    ai_keywords = ['machine learning', 'neural network', 'deep learning',
                   'convolutional', 'cnn', 'feature extraction',
                   'pattern recognition', 'generative', 'simulation',
                   'interactive learning', 'adaptive educational', 'ai']
    if 191 <= concept_id <= 200 or any(kw in label_lower for kw in ai_keywords):
        return 'AI'

    # Default to MISC
    return 'MISC'


def add_taxonomy_to_csv(input_csv: str, output_csv: str):
    """Read CSV, add taxonomy column, and write updated CSV."""

    rows = []
    with open(input_csv, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            concept_id = int(row['ConceptID'])
            concept_label = row['ConceptLabel']
            taxonomy_id = assign_taxonomy(concept_id, concept_label)

            rows.append({
                'ConceptID': concept_id,
                'ConceptLabel': concept_label,
                'Dependencies': row['Dependencies'],
                'TaxonomyID': taxonomy_id
            })

    # Write updated CSV
    with open(output_csv, 'w', encoding='utf-8', newline='') as f:
        fieldnames = ['ConceptID', 'ConceptLabel', 'Dependencies', 'TaxonomyID']
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        writer.writerows(rows)

    # Count concepts per taxonomy
    taxonomy_counts = {}
    for row in rows:
        tax = row['TaxonomyID']
        taxonomy_counts[tax] = taxonomy_counts.get(tax, 0) + 1

    print(f"✅ Taxonomy added to CSV: {output_csv}")
    print(f"\n📊 Taxonomy Distribution:")
    for tax in sorted(taxonomy_counts.keys()):
        count = taxonomy_counts[tax]
        percentage = (count / len(rows)) * 100
        print(f"  {tax:6s}: {count:3d} concepts ({percentage:5.1f}%)")

    return taxonomy_counts


if __name__ == "__main__":
    import sys

    input_csv = "/Users/danmccreary/Documents/ws/signal-processing/data/concept-dependencies.csv"
    output_csv = "/Users/danmccreary/Documents/ws/signal-processing/data/concept-dependencies.csv"

    if len(sys.argv) > 1:
        input_csv = sys.argv[1]
    if len(sys.argv) > 2:
        output_csv = sys.argv[2]

    taxonomy_counts = add_taxonomy_to_csv(input_csv, output_csv)
