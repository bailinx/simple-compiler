import SimpleLexer from "./lexer";
import { Token } from "./token";
import { SimpleTokenReader, TokenReader } from "./tokenReader";

const dump = (reader: SimpleTokenReader) => {
  console.log('text\ttype');
  let token: Token | null = null;
  while ((token = reader.read()) !== null) {
    console.log(`${token.getText()}\t${token.getType()}`);
  }
}

const main = () => {
  const lexer: SimpleLexer = new SimpleLexer();
  let script = 'int age = 45;';
  let reader: SimpleTokenReader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  dump(reader);

  script = 'in age = 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  dump(reader);

  script = 'age >= 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  dump(reader);

  script = 'age > 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  dump(reader);
}

main();