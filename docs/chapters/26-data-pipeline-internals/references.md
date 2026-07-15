# References: Data Pipeline Internals

1. [Comma-separated values](https://en.wikipedia.org/wiki/Comma-separated_values) - Wikipedia - Covers CSV header conventions and field-delimiting rules, directly underlying this chapter's CSV Header and Pipe-Delimited Field sections.

2. [JSON](https://en.wikipedia.org/wiki/JSON) - Wikipedia - Explains JSON's object and array structure, the format this chapter's Node Record, Edge Record, Group Record, and Metadata Record sections all serialize into.

3. [Serialization](https://en.wikipedia.org/wiki/Serialization) - Wikipedia - Defines serialization as converting in-memory data into a storable or transmittable format, directly underlying this chapter's JSON Serialization section.

4. [Extract, transform, load](https://en.wikipedia.org/wiki/Extract,_transform,_load) - Wikipedia - Describes the general ETL pattern a data pipeline follows, the broader discipline this chapter's Data Pipeline and Data Transformation sections apply to CSV-to-JSON graph generation specifically.

5. [Dublin Core](https://en.wikipedia.org/wiki/Dublin_Core) - Wikipedia - Covers the metadata element set this chapter's Metadata Record, Version Metadata, and License Metadata sections apply to this project's own `metadata.json` file.

6. [Software versioning](https://en.wikipedia.org/wiki/Software_versioning) - Wikipedia - Explains version-numbering conventions, background for this chapter's Version Metadata section.

7. [Creative Commons license](https://en.wikipedia.org/wiki/Creative_Commons_license) - Wikipedia - Explains the CC BY-NC-SA license type this project's own `metadata.json` uses, directly relevant to this chapter's License Metadata section.

8. [Reproducibility](https://en.wikipedia.org/wiki/Reproducibility) - Wikipedia - Covers reproducibility as a general standard in research and engineering, the principle this chapter's Reproducible Generation section applies specifically to a learning-graph generation pipeline.

9. [python: json — JSON encoder and decoder](https://docs.python.org/3/library/json.html) - Python Software Foundation - The official documentation for Python's `json` module, including `json.dump()`, the function this project's own `csv-to-json.py` calls to perform JSON Serialization.

10. [python: csv — CSV File Reading and Writing](https://docs.python.org/3/library/csv.html) - Python Software Foundation - The official documentation for Python's `csv` module, including `csv.DictReader`, the function this project's own pipeline scripts use to parse CSV Header and row data.
