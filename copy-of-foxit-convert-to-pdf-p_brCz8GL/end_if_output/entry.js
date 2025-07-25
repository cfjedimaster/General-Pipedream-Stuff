export default {
  type: "action",
  props: {
    _filter: "any",
  },
  run({ $ }) {
    const _filter = this._filter
    if (!_filter || typeof _filter !== "object") {
      throw new Error("filter not configured correctly")
    }
    const messageOnContinue = "Continuing workflow"
    const messageOnEnd = "Ending workflow"
    let result = evalRuleGroup(_filter.rules)
    const _continue = ((typeof _filter.continue === "undefined") || _filter.continue === "true") ? result : !result
    return _continue ? $.export("$summary", messageOnContinue) : $.flow.exit(messageOnEnd)
  },
}

// config.rules
function evalRuleGroup(rules) {
  const and = rules.t === "and"
  let v = and
  for (const r of rules.r) {
    const b = ("t" in r) ? evalRuleGroup(r) : evalRule(r)
    v = and ? v && b : v || b
  }
  return v
}
// XXX if rule.a is {{something}} should probably NOT +rule.a, but if rule.a is "12" we should... hmm
function evalRule(rule) {
  switch (rule.op) {
    default: throw new Error(`unhandled op: ${rule.op}`)
    case "exist": return rule.a !== undefined
    case "!exist": return rule.a === undefined
    case "null": return rule.a === null
    case "!null": return rule.a !== null
    case "str": return typeof rule.a === "string"
    case "!str": return typeof rule.a !== "string"
    case "str ": return typeof rule.a === "string" && !!rule.a.match(/^\s*$/)
    case "str! ": return typeof rule.a === "string" && !rule.a.match(/^\s*$/)
    case "str=": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.a.localeCompare(rule.b, undefined, { sensitivity: rule.matchCase ? "variant" : "base" }) == 0)
    case "str!=": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.a.localeCompare(rule.b, undefined, { sensitivity: rule.matchCase ? "variant" : "base" }) != 0)
    case "str^": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.matchCase ? rule.a.startsWith(rule.b) : rule.a.toLowerCase().startsWith(rule.b.toLowerCase()))
    case "str/": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.matchCase ? rule.a.includes(rule.b) : rule.a.toLowerCase().includes(rule.b.toLowerCase()))
    case "str!/": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.matchCase ? !rule.a.includes(rule.b) : !rule.a.toLowerCase().includes(rule.b.toLowerCase()))
    case "str$": return typeof rule.a === "string" && typeof rule.b === "string" && (rule.matchCase ? rule.a.endsWith(rule.b) : rule.a.toLowerCase().endsWith(rule.b.toLowerCase()))
    case "num": return typeof rule.a === "number"
    case "!num": return typeof rule.a !== "number"
    case "num=": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a === +rule.b
    case "num!=": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a !== +rule.b
    case "num>": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a > +rule.b
    case "num>=": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a >= +rule.b
    case "num<": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a < +rule.b
    case "num<=": return typeof +rule.a === "number" && typeof +rule.b === "number" && +rule.a <= +rule.b
    case "true": return typeof rule.a === "boolean" && rule.a
    case "false": return typeof rule.a === "boolean" && !rule.a
    case "bool": return typeof rule.a === "boolean"
    case "!bool": return typeof rule.a !== "boolean"
    case "bool=": return typeof rule.a === "boolean" && typeof rule.b === "boolean" && rule.a === rule.b
  }
}
