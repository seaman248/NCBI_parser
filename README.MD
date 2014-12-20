<bold>Generator</bold> — generate search terms for PubMed searching, using litle file (inputText.txt).
<bold>Abstractor</bold> — http request's to abstract pages and return clean abstract text
<bold>Collector</bold> — connect abstractor and generator. Return many abstracts to output.txt file
<bold>Translator</bold> — get big text from output.txt and generate json file which contain [{enW: 'cell', ruW: 'клетка', en: '...en text...', ru: '...русское предложение...'}...n]. It program using Yandex translate API and have problem with 'TOO MANY REQUEST'. Maybe i will solve this problem sometime.


