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
};

main();