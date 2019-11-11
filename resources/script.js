const asPercent = (n, d = 1) => {
    return (n * 100).toLocaleString(undefined, {minimumFractionDigits: d}) + "%";
};
const asNumber = (n, d = 0) => n.toLocaleString(undefined, {minimumFractionDigits: d});

const isZuerichOrWinterthur = (m) => m.id === "171" || m.id === "158";

const createTemplateNode = (municipality) => {

    const concatWithLinebreak = (l) => l.reduce((a, b) => a + b + "<br/>", "");

    // social
    const foreignersTooltip = (m) => concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asPercent(m.foreigners[y])}`;
    }));
    const populationTooltip = (m) => concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asNumber(m.population[y])}`;
    }));
    const svpVotersTooltip = (m) => concatWithLinebreak([2011, 2015, 2019].map(y => {
        return `${y}: ${asPercent(m.svpVoters[y])}`;
    }));
    const crimeRateTooltip = (m) => concatWithLinebreak([2013, 2014].map(y => {
        return `${y}: ${asNumber(m.crimeRate[y])}`;
    }));
    // financials
    const socialSupportTooltip = (m) => concatWithLinebreak([2014, 2015, 2016, 2017].map(y => {
        return `${y}: ${asPercent(m.socialSupport[y])}`;
    }));
    const emptyApartmentsTooltip = (m) => concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asPercent(m.emptyApartments[y], 2)}`;
    }));
    const incomeTooltip = (m) => concatWithLinebreak([2014, 2015, 2016, 2017, 2018].map(y => {
        return `${y}: CHF ${asNumber(m.income[y])}`;
    }));
    // school info
    const socialIndexTooltip = (m) => concatWithLinebreak([2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asNumber(m.schoolInfo[y].socialIndex, 1)}`;
    }));
    const socialIndexZuerichOrWinterthurTooltip = (m, n) => concatWithLinebreak([2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asNumber(m.schoolInfo[y].filter(s => s.name === n)[0].socialIndex, 1)}`;
    }));
    const socialIndex = (m) => {
        const explanation = "Social index is a combination of these 3 numbers:\n" +
            "1. Share of foreign students (students from Germany, Austria and Lichtenstein are accounted for as Swiss)\n" +
            "2. Share of students on social welfare\n" +
            "3. Share of parents recieveing govermental support due to their children and whose income is below the cantonal median of parents recieveing govermental support due to their children ";
        return isZuerichOrWinterthur(m) ?
            `<span class="row"><b>Social index</b></span><img src="resources/questionMark.png" class="question-mark" title="${explanation}"/><br/>` +
            concatWithLinebreak(m.schoolInfo[2018].map(s => {
                return `<span class="row">${s.name}</span><span class="value">
                                ${asNumber(s.socialIndex, 1)}<span class="tooltip">${socialIndexZuerichOrWinterthurTooltip(m, s.name)}</span></span>`
            }))
            :
            `<span class="row">Social index</span><img src="resources/questionMark.png" class="question-mark" title="${explanation}"/><span class="value">${asNumber(m.schoolInfo["2018"].socialIndex, 1)}
                    <span class="tooltip">${socialIndexTooltip(m)}</span>
                    </span><br/> `;
    };

    const proceededToGymnasiumTooltip = (m) => concatWithLinebreak([2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asPercent(m.schoolInfo[y].proceededToGymnasium)}`;
    }));
    const proceededToGymnasiumZuerichOrWinterthurTooltip = (m, n) => concatWithLinebreak([2015, 2016, 2017, 2018].map(y => {
        return `${y}: ${asPercent(m.schoolInfo[y].filter(s => s.name === n)[0].proceededToGymnasium)}`;
    }));
    const proceededToGymnasium = (m) => {
        const explanation = "Share of students who after finishing primary or secondary school proceeded to gymnasium";
        return isZuerichOrWinterthur(m) ?
            `<span class="row"><b>Share of gymnasium admissions</b></span><img src="resources/questionMark.png" class="question-mark" title="${explanation}"/><br/>` +
            concatWithLinebreak(m.schoolInfo[2018].map(s => {
                return `<span class="row">${s.name}</span><span class="value">
                                ${asPercent(s.proceededToGymnasium)}<span class="tooltip">${proceededToGymnasiumZuerichOrWinterthurTooltip(m, s.name)}</span></span>`
            }))
            :
            `<span class="row">Share of gymnasium admissions</span><img src="resources/questionMark.png" class="question-mark" title="${explanation}"/><span class="value">${asPercent(m.schoolInfo["2018"].proceededToGymnasium)}
                    <span class="tooltip">${proceededToGymnasiumTooltip(m)}</span>
                    </span><br/>`;
    };

    const template = document.createElement('div');
    template.innerHTML =
        `<span class="row"><h3 class="row legend-title">${municipality.name}</h3></span>
                <form>
                    <fieldset>
                        <legend><img src="resources/social.png" title="Social"></legend>
                        <span class="row">Population</span><span class="value">${asNumber(municipality.population["2018"])}
                            <span class="tooltip">${populationTooltip(municipality)}</span>
                        </span><br/>
                        <span class="row">Share of foreign nationals</span>
                        <span class="value">${asPercent(municipality.foreigners["2018"])}
                            <span class="tooltip">${foreignersTooltip(municipality)}</span>
                        </span><br/>
                        <span class="row">Share of SVP voters</span><span class="value">${asPercent(municipality.svpVoters["2019"])}
                            <span class="tooltip">${svpVotersTooltip(municipality)}</span>
                        </span><br/>
                           <span class="row">Crime rate</span><img src="resources/questionMark.png" class="question-mark" title="Recorded crime (StGB, Swiss Criminal Code) per 1000 inhabitants, in &#8240;"/><span class="value">${asNumber(municipality.crimeRate["2014"])}
                            <span class="tooltip">${crimeRateTooltip(municipality)}</span>
                        </span><br/>
                    </fieldset>
                </form>
                <form>
                    <fieldset>
                        <legend><img src="resources/financials.png"  title="Financials"></legend>
                        <span class="row">Share of welfare recipients</span><span class="value">${asPercent(municipality.socialSupport["2017"])}
                            <span class="tooltip">${socialSupportTooltip(municipality)}</span>
                        </span><br/>
                        <span class="row">Share of empty apartments</span><span class="value">${asPercent(municipality.emptyApartments["2018"], 2)}
                            <span class="tooltip">${emptyApartmentsTooltip(municipality)}</span>
                        </span><br/>
                        <span class="row">Average taxable income</span><span class="value">CHF ${asNumber(municipality.income["2018"])}
                            <span class="tooltip">${incomeTooltip(municipality)}</span>
                        </span><br/>
                    </fieldset>
                </form>
                <form>
                    <fieldset>
                        <legend><img src="resources/school.png" title="School information"></legend>
                        ${socialIndex(municipality)}
                        ${proceededToGymnasium(municipality)}
                    </fieldset>
                </form>`;
    return template;
};

const recreateLegend = (id) => {
    const data = municipalitiesData.filter(d => d.id === id)[0];
    const legend = document.getElementById("legend");
    while (legend.hasChildNodes()) {
        legend.removeChild(legend.lastChild);
    }
    legend.appendChild(createTemplateNode(data));
};

const initSlider = (name, min, max) => {
    document.getElementById(name + "Min").min = Math.round(min);
    document.getElementById(name + "Min").max = Math.round(max);
    document.getElementById(name + "Min").value = Math.round(min);
    document.getElementById(name + "Max").min = Math.round(min);
    document.getElementById(name + "Max").max = Math.round(max);
    document.getElementById(name + "Max").value = Math.round(max);
};

const applyFilter = () => {

    const checkSliderValues = (name) => {
        if (parseInt(document.getElementById(name + "Min").value) > parseInt(document.getElementById(name + "Max").value)) {
            document.getElementById(name + "Min").value = document.getElementById(name + "Max").value;
        }
    };
    const isInRange = (name, value) => parseInt(document.getElementById(name + "Min").value) <= value && value <= parseInt(document.getElementById(name + "Max").value);
    const isSchoolInfoInRange = (m, name, extractorFn) => {
        if (isZuerichOrWinterthur(m)) {
            const minValue = Math.min(...m.schoolInfo[2018].map(i => extractorFn(i)));
            const maxValue = Math.max(...m.schoolInfo[2018].map(i => extractorFn(i)));
            return (parseInt(document.getElementById(name + "Min").value) <= maxValue && minValue <= parseInt(document.getElementById(name + "Max").value));
        } else
            return parseInt(document.getElementById(name + "Min").value) <= extractorFn(m.schoolInfo[2018]) && extractorFn(m.schoolInfo[2018]) <= parseInt(document.getElementById(name + "Max").value);
    };
    const updateLabel = (title, name, formatFn) => document.getElementById(name + "FilterLabel").textContent = title + " from " +
        formatFn(document.getElementById(name + "Min").value) + " till " + formatFn(document.getElementById(name + "Max").value);

    checkSliderValues("population");
    checkSliderValues("foreigners");
    checkSliderValues("svpVoters");
    checkSliderValues("crimeRate");
    checkSliderValues("socialSupport");
    checkSliderValues("emptyApartments");
    checkSliderValues("income");
    checkSliderValues("socialIndex");
    checkSliderValues("proceededToGymnasium");

    updateLabel("Population", "population", (v) => asNumber(v));
    updateLabel("Share of foreign nationals", "foreigners", v => asPercent(v / 1000));
    updateLabel("Share of SVP voters", "svpVoters", v => asPercent(v / 1000));
    updateLabel("Crime rate", "crimeRate", v => asNumber(v / 10));
    updateLabel("Share of welfare recipients", "socialSupport", v => asPercent(v / 10000));
    updateLabel("Share of empty apartments", "emptyApartments", v => asPercent(v / 10000));
    updateLabel("Average taxable income", "income", (v) => asNumber(v));
    updateLabel("Social index", "socialIndex", (v) => asNumber(v));
    updateLabel("Share of gymnasium admissions", "proceededToGymnasium", (v) => asPercent(v / 100));

    const idsInRange = municipalitiesData.filter(m =>
        isInRange("population", m.population[2018]) &&
        isInRange("foreigners", m.foreigners[2018] * 1000) &&
        isInRange("svpVoters", m.svpVoters[2019] * 1000) &&
        isInRange("crimeRate", m.crimeRate[2014] * 10) &&
        isInRange("socialSupport", m.socialSupport[2017] * 10000) &&
        isInRange("emptyApartments", m.emptyApartments[2018] * 10000) &&
        isInRange("income", m.income[2018]) &&
        isSchoolInfoInRange(m, "socialIndex", i => i.socialIndex) &&
        isSchoolInfoInRange(m, "proceededToGymnasium", i => i.proceededToGymnasium * 100)).map(m => m.id);

    const municipalities = document.getElementById('svgMap').contentDocument.getElementById('municipalities');
    if (municipalities != null) {
        Array.prototype.forEach.call(municipalities.childNodes, m => {
            if (m.attributes && m.getAttribute("id")) {
                if (idsInRange.filter(id => id === m.getAttribute("id")).length > 0) {
                    m.setAttribute('fill', '#d5daa3');
                } else {
                    m.setAttribute('fill', 'white');
                }
            }
        });
    }
};

document.getElementById('svgMap').addEventListener("load", function () {

    recreateLegend("171");
    // social
    initSlider("population", Math.min(...municipalitiesData.map(m => m.population[2018])) - 1, Math.max(...municipalitiesData.map(m => m.population[2018])) + 1);
    initSlider("foreigners", Math.min(...municipalitiesData.map(m => m.foreigners[2018])) * 1000 - 1, Math.max(...municipalitiesData.map(m => m.foreigners[2018])) * 1000 + 1);
    initSlider("svpVoters", Math.min(...municipalitiesData.map(m => m.svpVoters[2019])) * 1000 - 1, Math.max(...municipalitiesData.map(m => m.svpVoters[2019])) * 1000 + 1);
    initSlider("crimeRate", Math.min(...municipalitiesData.map(m => m.crimeRate[2014])) * 10 - 1, Math.max(...municipalitiesData.map(m => m.crimeRate[2014])) * 10 + 1);
    // financials
    initSlider("socialSupport", Math.min(...municipalitiesData.map(m => m.socialSupport[2017])) * 10000, Math.max(...municipalitiesData.map(m => m.socialSupport[2017])) * 10000 + 1);
    initSlider("emptyApartments", Math.min(...municipalitiesData.map(m => m.emptyApartments[2018])) * 10000, Math.max(...municipalitiesData.map(m => m.emptyApartments[2018])) * 10000 + 1);
    initSlider("income", Math.min(...municipalitiesData.map(m => m.income[2018])) - 1, Math.max(...municipalitiesData.map(m => m.income[2018])) + 1);
    //school info
    const collectValues = (extractFn) => {
        return municipalitiesData.map(m => (isZuerichOrWinterthur(m) ? m.schoolInfo[2018].map(i => extractFn(i)) : [extractFn(m.schoolInfo[2018])])).reduce((acc, val) => acc.concat(val), []);
    };
    initSlider("socialIndex", Math.min(...collectValues(i => i.socialIndex)), Math.max(...collectValues(i => i.socialIndex)));
    initSlider("proceededToGymnasium", Math.min(...collectValues(i => i.proceededToGymnasium)) * 100, Math.max(...collectValues(i => i.proceededToGymnasium)) * 100 + 1);

    applyFilter();

    const municipalities = this.contentDocument.getElementById('municipalities');
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
