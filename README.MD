<b>Generator</b> — generate search terms for PubMed searching, using litle file (inputText.txt).
<b>Abstractor</b> — http request's to abstract pages and return clean abstract text
<b>Collector</b> — connect abstractor and generator. Return many abstracts to output.txt file
<b>Translator</b> — get big text from output.txt and generate json file which contain [{enW: 'cell', ruW: 'клетка', en: '...en text...', ru: '...русское предложение...'}...n]. It program using Yandex translate API and have problem with 'TOO MANY REQUEST'. Maybe i will solve this problem sometime.


