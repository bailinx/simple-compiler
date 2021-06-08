import SimpleLexer from "./src/lexer";
import { Token } from "./src/token";
import { SimpleTokenReader, TokenReader } from "./src/tokenReader";

const dump = (reader: SimpleTokenReader) => {
  console.log('text\ttype');
  let token: Token | null = null;
  while ((token = reader.read()) !== null) {
    console.log(`${token.getText()}\t${token.getType()}`);
  }
}

const main = () => {
  const lexer: SimpleLexer = new SimpleLexer();
  const script = 'int age = 45;';
  const reader: SimpleTokenReader = lexer.tokenize(script);
  console.log('parse :' + script);
  dump(reader);
}

main();