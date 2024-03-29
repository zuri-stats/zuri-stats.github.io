"use strict";

function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}

function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }
}

var asPercent = function asPercent(n) {
    var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    return (n * 100).toLocaleString(undefined, {
        minimumFractionDigits: d
    }) + "%";
};

var asNumber = function asNumber(n) {
    var d = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
    return n.toLocaleString(undefined, {
        minimumFractionDigits: d
    });
};

var isZuerichOrWinterthur = function isZuerichOrWinterthur(m) {
    return m.id === "171" || m.id === "158";
};

var createTemplateNode = function createTemplateNode(municipality) {
    var concatWithLinebreak = function concatWithLinebreak(l) {
        return l.reduce(function (a, b) {
            return a + b + "<br/>";
        }, "");
    }; // social


    var foreignersTooltip = function foreignersTooltip(m) {
        return concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.foreigners[y]));
        }));
    };

    var populationTooltip = function populationTooltip(m) {
        return concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asNumber(m.population[y]));
        }));
    };

    var svpVotersTooltip = function svpVotersTooltip(m) {
        return concatWithLinebreak([2011, 2015, 2019].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.svpVoters[y]));
        }));
    };

    var crimeRateTooltip = function crimeRateTooltip(m) {
        return concatWithLinebreak([2013, 2014].map(function (y) {
            return "".concat(y, ": ").concat(asNumber(m.crimeRate[y]));
        }));
    }; // financials


    var socialSupportTooltip = function socialSupportTooltip(m) {
        return concatWithLinebreak([2014, 2015, 2016, 2017].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.socialSupport[y]));
        }));
    };

    var emptyApartmentsTooltip = function emptyApartmentsTooltip(m) {
        return concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.emptyApartments[y], 2));
        }));
    };

    var incomeTooltip = function incomeTooltip(m) {
        return concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": CHF ").concat(asNumber(m.income[y]));
        }));
    }; // school info


    var socialIndexTooltip = function socialIndexTooltip(m) {
        return concatWithLinebreak([2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asNumber(m.schoolInfo[y].socialIndex, 1));
        }));
    };

    var socialIndexZuerichOrWinterthurTooltip = function socialIndexZuerichOrWinterthurTooltip(m, n) {
        return concatWithLinebreak([2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asNumber(m.schoolInfo[y].filter(function (s) {
                return s.name === n;
            })[0].socialIndex, 1));
        }));
    };

    var socialIndex = function socialIndex(m) {
        var explanation = "Social index is a combination of these 3 numbers:\n" + "1. Share of foreign students (students from Germany, Austria and Lichtenstein are accounted for as Swiss)\n" + "2. Share of students on social welfare\n" + "3. Share of parents recieveing govermental support due to their children and whose income is below the cantonal median of parents recieveing govermental support due to their children ";
        return isZuerichOrWinterthur(m) ? "<span class=\"row\"><b>Social index</b></span><img src=\"resources/questionMark.png\" class=\"question-mark\" title=\"".concat(explanation, "\"/><br/>") + concatWithLinebreak(m.schoolInfo[2018].map(function (s) {
            return "<span class=\"row\">".concat(s.name, "</span><span class=\"value\">\n                                ").concat(asNumber(s.socialIndex, 1), "<span class=\"tooltip\">").concat(socialIndexZuerichOrWinterthurTooltip(m, s.name), "</span></span>");
        })) : "<span class=\"row\">Social index</span><img src=\"resources/questionMark.png\" class=\"question-mark\" title=\"".concat(explanation, "\"/><span class=\"value\">").concat(asNumber(m.schoolInfo["2018"].socialIndex, 1), "\n                    <span class=\"tooltip\">").concat(socialIndexTooltip(m), "</span>\n                    </span><br/> ");
    };

    var proceededToGymnasiumTooltip = function proceededToGymnasiumTooltip(m) {
        return concatWithLinebreak([2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.schoolInfo[y].proceededToGymnasium));
        }));
    };

    var proceededToGymnasiumZuerichOrWinterthurTooltip = function proceededToGymnasiumZuerichOrWinterthurTooltip(m, n) {
        return concatWithLinebreak([2015, 2016, 2017, 2018].map(function (y) {
            return "".concat(y, ": ").concat(asPercent(m.schoolInfo[y].filter(function (s) {
                return s.name === n;
            })[0].proceededToGymnasium));
        }));
    };

    var proceededToGymnasium = function proceededToGymnasium(m) {
        var explanation = "Share of students who after finishing primary or secondary school proceeded to gymnasium";
        return isZuerichOrWinterthur(m) ? "<span class=\"row\"><b>Share of gymnasium admissions</b></span><img src=\"resources/questionMark.png\" class=\"question-mark\" title=\"".concat(explanation, "\"/><br/>") + concatWithLinebreak(m.schoolInfo[2018].map(function (s) {
            return "<span class=\"row\">".concat(s.name, "</span><span class=\"value\">\n                                ").concat(asPercent(s.proceededToGymnasium), "<span class=\"tooltip\">").concat(proceededToGymnasiumZuerichOrWinterthurTooltip(m, s.name), "</span></span>");
        })) : "<span class=\"row\">Share of gymnasium admissions</span><img src=\"resources/questionMark.png\" class=\"question-mark\" title=\"".concat(explanation, "\"/><span class=\"value\">").concat(asPercent(m.schoolInfo["2018"].proceededToGymnasium), "\n                    <span class=\"tooltip\">").concat(proceededToGymnasiumTooltip(m), "</span>\n                    </span><br/>");
    };

    var template = document.createElement('div');
    template.innerHTML = "<span class=\"row\"><h3 class=\"row legend-title\">".concat(municipality.name, "</h3></span>\n                <form>\n                    <fieldset>\n                        <legend><img src=\"resources/social.png\" title=\"Social\"></legend>\n                        <span class=\"row\">Population</span><span class=\"value\">").concat(asNumber(municipality.population["2018"]), "\n                            <span class=\"tooltip\">").concat(populationTooltip(municipality), "</span>\n                        </span><br/>\n                        <span class=\"row\">Share of foreign nationals</span>\n                        <span class=\"value\">").concat(asPercent(municipality.foreigners["2018"]), "\n                            <span class=\"tooltip\">").concat(foreignersTooltip(municipality), "</span>\n                        </span><br/>\n                        <span class=\"row\">Share of SVP voters</span><span class=\"value\">").concat(asPercent(municipality.svpVoters["2019"]), "\n                            <span class=\"tooltip\">").concat(svpVotersTooltip(municipality), "</span>\n                        </span><br/>\n                           <span class=\"row\">Crime rate</span><img src=\"resources/questionMark.png\" class=\"question-mark\" title=\"Recorded crime (StGB, Swiss Criminal Code) per 1000 inhabitants, in &#8240;\"/><span class=\"value\">").concat(asNumber(municipality.crimeRate["2014"]), "\n                            <span class=\"tooltip\">").concat(crimeRateTooltip(municipality), "</span>\n                        </span><br/>\n                    </fieldset>\n                </form>\n                <form>\n                    <fieldset>\n                        <legend><img src=\"resources/financials.png\"  title=\"Financials\"></legend>\n                        <span class=\"row\">Share of welfare recipients</span><span class=\"value\">").concat(asPercent(municipality.socialSupport["2017"]), "\n                            <span class=\"tooltip\">").concat(socialSupportTooltip(municipality), "</span>\n                        </span><br/>\n                        <span class=\"row\">Share of empty apartments</span><span class=\"value\">").concat(asPercent(municipality.emptyApartments["2018"], 2), "\n                            <span class=\"tooltip\">").concat(emptyApartmentsTooltip(municipality), "</span>\n                        </span><br/>\n                        <span class=\"row\">Average taxable income</span><span class=\"value\">CHF ").concat(asNumber(municipality.income["2018"]), "\n                            <span class=\"tooltip\">").concat(incomeTooltip(municipality), "</span>\n                        </span><br/>\n                    </fieldset>\n                </form>\n                <form>\n                    <fieldset>\n                        <legend><img src=\"resources/school.png\" title=\"School information\"></legend>\n                        ").concat(socialIndex(municipality), "\n                        ").concat(proceededToGymnasium(municipality), "\n                    </fieldset>\n                </form>");
    return template;
};

var recreateLegend = function recreateLegend(id) {
    var data = municipalitiesData.filter(function (d) {
        return d.id === id;
    })[0];
    var legend = document.getElementById("legend");

    while (legend.hasChildNodes()) {
        legend.removeChild(legend.lastChild);
    }

    legend.appendChild(createTemplateNode(data));
};

var initSlider = function initSlider(name, min, max) {
    document.getElementById(name + "Min").min = Math.round(min);
    document.getElementById(name + "Min").max = Math.round(max);
    document.getElementById(name + "Min").value = Math.round(min);
    document.getElementById(name + "Max").min = Math.round(min);
    document.getElementById(name + "Max").max = Math.round(max);
    document.getElementById(name + "Max").value = Math.round(max);
};

var applyFilter = function applyFilter() {
    var checkSliderValues = function checkSliderValues(name) {
        if (parseInt(document.getElementById(name + "Min").value) > parseInt(document.getElementById(name + "Max").value)) {
            document.getElementById(name + "Min").value = document.getElementById(name + "Max").value;
        }
    };

    var isInRange = function isInRange(name, value) {
        return parseInt(document.getElementById(name + "Min").value) <= value && value <= parseInt(document.getElementById(name + "Max").value);
    };

    var isSchoolInfoInRange = function isSchoolInfoInRange(m, name, extractorFn) {
        if (isZuerichOrWinterthur(m)) {
            var minValue = Math.min.apply(Math, _toConsumableArray(m.schoolInfo[2018].map(function (i) {
                return extractorFn(i);
            })));
            var maxValue = Math.max.apply(Math, _toConsumableArray(m.schoolInfo[2018].map(function (i) {
                return extractorFn(i);
            })));
            return parseInt(document.getElementById(name + "Min").value) <= maxValue && minValue <= parseInt(document.getElementById(name + "Max").value);
        } else return parseInt(document.getElementById(name + "Min").value) <= extractorFn(m.schoolInfo[2018]) && extractorFn(m.schoolInfo[2018]) <= parseInt(document.getElementById(name + "Max").value);
    };

    var updateLabel = function updateLabel(title, name, formatFn) {
        return document.getElementById(name + "FilterLabel").textContent = title + " from " + formatFn(document.getElementById(name + "Min").value) + " till " + formatFn(document.getElementById(name + "Max").value);
    };

    checkSliderValues("population");
    checkSliderValues("foreigners");
    checkSliderValues("svpVoters");
    checkSliderValues("crimeRate");
    checkSliderValues("socialSupport");
    checkSliderValues("emptyApartments");
    checkSliderValues("income");
    checkSliderValues("socialIndex");
    checkSliderValues("proceededToGymnasium");
    updateLabel("Population", "population", function (v) {
        return asNumber(v);
    });
    updateLabel("Share of foreign nationals", "foreigners", function (v) {
        return asPercent(v / 1000);
    });
    updateLabel("Share of SVP voters", "svpVoters", function (v) {
        return asPercent(v / 1000);
    });
    updateLabel("Crime rate", "crimeRate", function (v) {
        return asNumber(v / 10);
    });
    updateLabel("Share of welfare recipients", "socialSupport", function (v) {
        return asPercent(v / 10000);
    });
    updateLabel("Share of empty apartments", "emptyApartments", function (v) {
        return asPercent(v / 10000);
    });
    updateLabel("Average taxable income", "income", function (v) {
        return asNumber(v);
    });
    updateLabel("Social index", "socialIndex", function (v) {
        return asNumber(v);
    });
    updateLabel("Share of gymnasium admissions", "proceededToGymnasium", function (v) {
        return asPercent(v / 100);
    });
    var idsInRange = municipalitiesData.filter(function (m) {
        return isInRange("population", m.population[2018]) && isInRange("foreigners", m.foreigners[2018] * 1000) && isInRange("svpVoters", m.svpVoters[2019] * 1000) && isInRange("crimeRate", m.crimeRate[2014] * 10) && isInRange("socialSupport", m.socialSupport[2017] * 10000) && isInRange("emptyApartments", m.emptyApartments[2018] * 10000) && isInRange("income", m.income[2018]) && isSchoolInfoInRange(m, "socialIndex", function (i) {
            return i.socialIndex;
        }) && isSchoolInfoInRange(m, "proceededToGymnasium", function (i) {
            return i.proceededToGymnasium * 100;
        });
    }).map(function (m) {
        return m.id;
    });
    var municipalities = document.getElementById('svgMap').contentDocument.getElementById('municipalities');

    if (municipalities != null) {
        Array.prototype.forEach.call(municipalities.childNodes, function (m) {
            if (m.attributes && m.getAttribute("id")) {
                if (idsInRange.filter(function (id) {
                    return id === m.getAttribute("id");
                }).length > 0) {
                    m.setAttribute('fill', '#d5daa3');
                } else {
                    m.setAttribute('fill', 'white');
                }
            }
        });
    }
};

document.getElementById('svgMap').addEventListener("load", function () {
    recreateLegend("171"); // social

    initSlider("population", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.population[2018];
    }))) - 1, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.population[2018];
    }))) + 1);
    initSlider("foreigners", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.foreigners[2018];
    }))) * 1000 - 1, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.foreigners[2018];
    }))) * 1000 + 1);
    initSlider("svpVoters", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.svpVoters[2019];
    }))) * 1000 - 1, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.svpVoters[2019];
    }))) * 1000 + 1);
    initSlider("crimeRate", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.crimeRate[2014];
    }))) * 10 - 1, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.crimeRate[2014];
    }))) * 10 + 1); // financials

    initSlider("socialSupport", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.socialSupport[2017];
    }))) * 10000, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.socialSupport[2017];
    }))) * 10000 + 1);
    initSlider("emptyApartments", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.emptyApartments[2018];
    }))) * 10000, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.emptyApartments[2018];
    }))) * 10000 + 1);
    initSlider("income", Math.min.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.income[2018];
    }))) - 1, Math.max.apply(Math, _toConsumableArray(municipalitiesData.map(function (m) {
        return m.income[2018];
    }))) + 1); //school info

    var collectValues = function collectValues(extractFn) {
        return municipalitiesData.map(function (m) {
            return isZuerichOrWinterthur(m) ? m.schoolInfo[2018].map(function (i) {
                return extractFn(i);
            }) : [extractFn(m.schoolInfo[2018])];
        }).reduce(function (acc, val) {
            return acc.concat(val);
        }, []);
    };

    initSlider("socialIndex", Math.min.apply(Math, _toConsumableArray(collectValues(function (i) {
        return i.socialIndex;
    }))), Math.max.apply(Math, _toConsumableArray(collectValues(function (i) {
        return i.socialIndex;
    }))));
    initSlider("proceededToGymnasium", Math.min.apply(Math, _toConsumableArray(collectValues(function (i) {
        return i.proceededToGymnasium;
    }))) * 100, Math.max.apply(Math, _toConsumableArray(collectValues(function (i) {
        return i.proceededToGymnasium;
    }))) * 100 + 1);
    applyFilter();
    var municipalities = this.contentDocument.getElementById('municipalities');

    municipalities.onclick = function (evt) {
        if (evt.target.getAttribute('id') && !isNaN(evt.target.getAttribute('id'))) {
            recreateLegend(evt.target.getAttribute('id'));
        }
    };

    municipalities.onmouseover = function (evt) {
        if (evt.target.getAttribute('id')) {
            evt.target.setAttribute('opacity', '0.5');
        }
    };

    municipalities.onmouseout = function (evt) {
        if (evt.target.getAttribute('id')) {
            evt.target.setAttribute('opacity', '1');
        }
    };
});
