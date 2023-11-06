class Mel {
  constructor() {
    this.value = {
      filipino: 0.375,
      chinese: 0.375,
      spanish: 0.1625,
      singaporean: 0.1625,
    }
    ;(this.mother = { filipno: 0.75, spanish: 0.25 }),
      (this.father = { chineese: 0.75, singaporean: 0.25 })
  }
}

function answerWhereFrom(asker_ethnicity, attempt_number) {
  if (asker_ethnicity !== white) {
    return new Mel()
  } else {
    switch (attempt_number) {
      case 1:
        return "California"
      case 2:
        return "Bay Area"
      case 3:
        return "Oakland"
      case 4:
        return "Concord"
      case 5:
        return "Michigan"
      case 6:
        return "CHINA"
    }
  }
}
