import { Expr } from '../src/micheline';
import { Parser } from '../src/micheline-parser';
import { emitMicheline } from '../src/micheline-emitter';
import { assertMichelsonScript, assertMichelsonData } from '../src/michelson-validator';

interface APIData {
  code: Expr;
  storage: Expr;
}

const testData: {
  json: string;
  code: string;
  storage: string;
  src?: APIData;
}[] = [
  {
    json: `{ "code": [ { "prim": "parameter", "args":
    [ { "prim": "or", "args": [ { "prim": "unit", "annots": [ "%default" ] }, { "prim": "pair", "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%counter" ] }, { "prim": "or", "args": 
    [ { "prim": "lambda", "args": [ { "prim": "unit" }, { "prim": "list", "args": [ { "prim": "operation" } ] } ], "annots": [ "%operation" ] }, { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%threshold" ] }, 
   { "prim": "list", "args": [ { "prim": "key" } ], "annots": [ "%keys" ] } ], "annots": [ "%change_keys" ] } ], "annots": [ ":action" ] } ], "annots": [ ":payload" ] }, { "prim": "list", "args": [ { "prim": "option", "args": 
   [ { "prim": "signature" } ] } ], "annots": [ "%sigs" ] } ], "annots": [ "%main" ] } ] } ] }, { "prim": "storage", "args": [ { "prim": "pair", "args": [ { "prim": "nat", "annots": [ "%stored_counter" ] }, { "prim": "pair", "args": 
   [ { "prim": "nat", "annots": [ "%threshold" ] }, { "prim": "list", "args": [ { "prim": "key" } ], "annots": [ "%keys" ] } ] } ] } ] }, { "prim": "code", "args": [ [ [ [ { "prim": "DUP" }, { "prim": "CAR" }, { "prim": "DIP", "args": 
   [ [ { "prim": "CDR" } ] ] } ] ], { "prim": "IF_LEFT", "args": [ [ { "prim": "DROP" }, { "prim": "NIL", "args": [ { "prim": "operation" } ] }, { "prim": "PAIR" } ], [ { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] }, 
   { "prim": "AMOUNT" }, [ [ { "prim": "COMPARE" }, { "prim": "EQ" } ], { "prim": "IF", "args": [ [], [ [ { "prim": "UNIT" }, { "prim": "FAILWITH" } ] ] ] } ], { "prim": "SWAP" }, { "prim": "DUP" }, { "prim": "DIP", "args": [ [ { "prim": "SWAP" } ] ] }, 
   { "prim": "DIP", "args": [ [ [ [ { "prim": "DUP" }, { "prim": "CAR" }, { "prim": "DIP", "args": [ [ { "prim": "CDR" } ] ] } ] ], { "prim": "DUP" }, { "prim": "SELF" }, { "prim": "ADDRESS" }, { "prim": "CHAIN_ID" }, { "prim": "PAIR" }, { "prim": "PAIR" }, { "prim": "PACK" }, { "prim": 
   "DIP", "args": [ [ [ [ { "prim": "DUP" }, { "prim": "CAR", "annots": [ "@counter" ] }, { "prim": "DIP", "args": [ [ { "prim": "CDR" } ] ] } ] ], { "prim": "DIP", "args": [ [ { "prim": "SWAP" } ] ] } ] ] }, { 
   "prim": "SWAP" } ] ] }, [ [ { "prim": "DUP" }, { "prim": "CAR", "annots": [ "@stored_counter" ] }, { "prim": "DIP", "args": [ [ { "prim": "CDR" } ] ] } ] ], { "prim": "DIP", "args": [ [ { "prim": "SWAP" } ] ]
    }, [ [ { "prim": "COMPARE" }, { "prim": "EQ" } ], { "prim": "IF", "args": [ [], [ [ { "prim": "UNIT" }, { "prim": "FAILWITH" } ] ] ] } ], { "prim": "DIP", "args": [ [ { "prim": "SWAP" } ] ] }, [ [ { "prim": 
   "DUP" }, { "prim": "CAR", "annots": [ "@threshold" ] }, { "prim": "DIP", "args": [ [ { "prim": "CDR", "annots": [ "@keys" ] } ] ] } ] ], { "prim": "DIP", "args": [ [ { "prim": "PUSH", "args": [ { "prim": "nat" }, 
   { "int": "0" } ], "annots": [ "@valid" ] }, { "prim": "SWAP" }, { "prim": "ITER", "args": [ [ { "prim": "DIP", "args": [ [ { "prim": "SWAP" } ] ] }, { "prim": "SWAP" }, { "prim": "IF_CONS", "args": [ [ [
    { "prim": "IF_NONE", "args": [ [ { "prim": "SWAP" }, { "prim": "DROP" } ], [ { "prim": "SWAP" }, { "prim": "DIP", "args": [ [ { "prim": "SWAP" }, { "prim": "DIP", "args": [ { "int": "2" }, [ [ { "prim": "DIP", "args": 
    [ [ { "prim": "DUP" } ] ] }, { "prim": "SWAP" } ] ] ] }, [ [ { "prim": "DIP", "args": [ { "int": "2" }, [ { "prim": "DUP" } ] ] }, { "prim": "DIG", "args": [ { "int": "3" } ] } ], { "prim": "DIP", 
   "args": [ [ { "prim": "CHECK_SIGNATURE" } ] ] }, { "prim": "SWAP" }, { "prim": "IF", "args": [ [ { "prim": "DROP" } ], [ { "prim": "FAILWITH" } ] ] } ], { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int":
    "1" } ] }, { "prim": "ADD", "annots": [ "@valid" ] } ] ] } ] ] } ] ], [ [ { "prim": "UNIT" }, { "prim": "FAILWITH" } ] ] ] }, { "prim": "SWAP" } ] ] } ] ] }, [ [ { "prim": "COMPARE" }, { "prim": "LE" } ], { 
   "prim": "IF", "args": [ [], [ [ { "prim": "UNIT" }, { "prim": "FAILWITH" } ] ] ] } ], { "prim": "IF_CONS", "args": [ [ [ { "prim": "UNIT" }, { "prim": "FAILWITH" } ] ], [] ] }, { "prim": "DROP" }, { "prim": "DIP", "args": 
   [ [ [ [ { "prim": "DUP" }, { "prim": "CAR" }, { "prim": "DIP", "args": [ [ { "prim": "CDR" } ] ] } ] ], { "prim": "PUSH", "args": [ { "prim": "nat" }, { "int": "1" } ] }, { "prim": "ADD", "annots": [ "@new_counter" ] }, { "prim": "PAIR" } ] ] }, 
   { "prim": "IF_LEFT", "args": [ [ { "prim": "UNIT" }, { "prim": "EXEC" } ], [ { "prim": "DIP", "args": [ [ { "prim": "CAR" } ] ] }, { "prim": "SWAP" }, { "prim": "PAIR" }, { "prim": "NIL", "args": [ { "prim": "operation" } ] } ] ] }, 
   { "prim": "PAIR" } ] ] } ] ] } ], "storage": { "prim": "Pair", "args": [ { "int": "0" }, { "prim": "Pair", "args": [ { "int": "1" }, [ { "string": "edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t" } ] ] } ] } }
  `,
  code : `{parameter (or (unit %default) (pair %main (pair :payload (nat %counter) (or :action (lambda %operation unit (list operation)) (pair %change_keys (nat %threshold) (list %keys key)))) (list %sigs (option signature))));storage (pair (nat %stored_counter) (pair (nat %threshold) (list %keys key)));code {UNPAIR;IF_LEFT {DROP;NIL operation;PAIR} {PUSH mutez 0;AMOUNT;ASSERT_CMPEQ;SWAP;DUP;DIP {SWAP};DIP {UNPAIR;DUP;SELF;ADDRESS;CHAIN_ID;PAIR;PAIR;PACK;DIP {UNPAIR @counter;DIP {SWAP}};SWAP};UNPAIR @stored_counter;DIP{SWAP};ASSERT_CMPEQ;DIP {SWAP};UNPAIR @threshold @keys;DIP {PUSH @valid nat 0;SWAP;ITER {DIP {SWAP};SWAP;IF_CONS {IF_SOME {SWAP;DIP {SWAP;DIIP {DUUP};{DUUUP;DIP {CHECK_SIGNATURE};SWAP;IF {DROP} {FAILWITH}};PUSH nat 1;ADD @valid}} {SWAP;DROP}} {FAIL};SWAP}};ASSERT_CMPLE;IF_CONS{FAIL} {};DROP;DIP {UNPAIR;PUSH nat 1;ADD @new_counter;PAIR};IF_LEFT {UNIT;EXEC} {DIP {CAR};SWAP;PAIR;NIL operation};PAIR}}}`,
  storage : '(Pair 0 (Pair 1 {"edpkuLxx9PQD8fZ45eUzrK3BhfDZJHhBuK4Zi49DcEGANwd2rpX82t"}))'
  }
];

for (const v of testData) {
  v.src = JSON.parse(v.json);
}

describe('Parser', () => {
  it('parse micheline', () => {
    const parser = new Parser({ expandMacros: true });
    for (const v of testData) {
      const script = parser.parseScript(v.code);
      expect(script).toEqual(v.src?.code);

      const data = parser.parseMichelineExpression(v.storage);
      expect(data).toEqual(v.src?.storage);
    }
  });

  it('parse json', () => {
    const parser = new Parser();
    for (const v of testData) {
      const script = parser.parseJSON(v.src?.code || []);
      expect(script).toEqual(v.src?.code);

      const data = parser.parseJSON(v.src?.storage || []);
      expect(data).toEqual(v.src?.storage);
    }
  });

  it('format', () => {
    for (const v of testData) {
      const parser = new Parser();
      let text = emitMicheline(v.src?.code || []);
      expect(text).toBe(v.code);

      text = emitMicheline(v.src?.storage || []);
      expect(text).toBe(v.storage);
    }
  });

  it('validate', () => {
    for (const v of testData) {
      assertMichelsonScript(v.src?.code || []);
      assertMichelsonData(v.src?.storage || []);
    }
  });
});
