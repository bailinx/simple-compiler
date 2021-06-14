import SimpleLexer from "./lexer";
import { Token } from "./token";
import { SimpleTokenReader } from "./tokenReader";

const main = () => {
  const lexer: SimpleLexer = new SimpleLexer();
  let script = 'int age = 45;';
  let reader: SimpleTokenReader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  SimpleLexer.dump(reader);

  script = 'in age = 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  SimpleLexer.dump(reader);

  script = 'age >= 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  SimpleLexer.dump(reader);

  script = 'age > 45';
  reader = lexer.tokenize(script);
  console.log('\nparse: ' + script);
  SimpleLexer.dump(reader);
}

main();