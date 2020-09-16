simple pronoun parser

• syntax: square brackets [ and ] around words, vertical bars | between parameters
• the parser replaces [they], [them], [their], [theirs], and [themself] within text as appropriate, using whichever set you've picked above
• other [word|words] in brackets are used based on whether the pronouns are singular or plural, respectively
• if you provide three parameters, they'll be parsed as [masculine|feminine|neutral] forms
• you can just put a [word] in brackets and the parser will do its best to use the right form, but it's not very good
• if you want the parser to ignore square brackets, put a backslash \[before] them
• [[names]] can be associated with a pronoun set, and the parser will use the appropriate set following an instance of the name (case sensitive)
• you can add new pronouns but they'll be lost when you reload