import SimpleLexer, { SimpleTokenReader } from 'simple-lexer';
// import { ASTNode, SimpleASTNode } from './ASTNode';
import { Calculator } from './calculator';

const main = () => {
  const simpleCalculator = new Calculator();

  const script1 = 'int a = b + 33;';
  console.log(`解析变量声明语句: ${script1}`);
  const lexer = new SimpleLexer();
  const tokens = lexer.tokenize(script1);
  console.log('\n词法分析如下: ');
  SimpleLexer.dump(new SimpleTokenReader(tokens.copy()));
  try {
    const node = simpleCalculator.iniDeclare(tokens);
    console.log('\nAST如下: ');
    node && Calculator.dump(node, '  ');
  } catch (ex) {
    console.error('发生异常: ' + ex);
  }

  const script2 = '6+8*7';
  simpleCalculator.evaluate(script2);

  // const script3 = '3+';
  // simpleCalculator.evaluate(script3);

  const script4 = '1+2 + 3';
  simpleCalculator.evaluate(script4);

  const script5 = '1+2*3-4/5';
  simpleCalculator.evaluate(script5);
};

main();