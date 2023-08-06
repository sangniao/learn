# Different ways to run schematics from the angular schematic

[![](https://repository-images.githubusercontent.com/356001736/c1021c00-9e08-11eb-8e0a-64283da6be69)](https://indepth.dev/posts/1453/different-ways-to-run-schematics-from-the-schematic)

| Run schematic 🔽          | Create a rule                                                   | Add task in context                                                          |
| ------------------------ | --------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| From same collection     | `rule = schematic(schemaName, options)`                         | `context.addTask(new RunSchematicTask(schemaName, options))`                 |
| From external collection | `rule = externalSchematic(collectionName, schemaName, options)` | `context.addTask(new RunSchematicTask(collectionName, schemaName, options))` |
