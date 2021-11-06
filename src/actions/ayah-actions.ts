



export interface DocumentActionStrategy {
    insert(text: string, options?: any);
}


export interface AyahOptions {

}

export class QuranAyahActionStrategy implements DocumentActionStrategy {

    insert(text: string, _options: AyahOptions) {

        Word.run((context) => {
            var paragraphs = context.document.getSelection().paragraphs;
            paragraphs.load();

            return context.sync().then(function () {

                paragraphs.items[0].insertHtml(text,
                    Word.InsertLocation.end);


            }).then(context.sync);
        });
    }

}


export class DocumentActionContext {
    private strategy: DocumentActionStrategy;

    public setStrategy(strategy: DocumentActionStrategy) {
        this.strategy = strategy;
    }

    insert(text: string, options?: any) {
        this.strategy.insert(text, options);
    }
}