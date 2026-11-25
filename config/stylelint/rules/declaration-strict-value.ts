// https://github.com/AndyOGo/stylelint-declaration-strict-value

const DeclarationStrictValueRules = {
  'scale-unlimited/declaration-strict-value': [
    ['/color$/', 'fill', 'stroke', 'font-size'], {
      disableFix: true,
    },
  ],
}

export {
  DeclarationStrictValueRules,
}
