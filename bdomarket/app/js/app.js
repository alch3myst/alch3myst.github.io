// Inputs
// Buy input
const add_buy_item = document.getElementById("add_buy_item");
const buy_items_list = document.getElementById("buy_items_list");

//Buy info
const buy_qtd = document.getElementById("buy_qtd");
const buy_total = document.getElementById("buy_total");

const direct_sell_with_pe = document.getElementById("direct_sell_with_pe");
const direct_sell_without_pe = document.getElementById(
  "direct_sell_without_pe"
);

const min_sell_with_pe = document.getElementById("min_sell_with_pe");
const min_sell_without_pe = document.getElementById("min_sell_without_pe");

// Sell inputs and outputs
const sell_value = document.getElementById("sell_value");
const sell_qtd = document.getElementById("sell_qtd");
const sell_value_info = document.getElementById("sell_value_info");
const sell_with_pe_proffit = document.getElementById("sell_with_pe_proffit");
const sell_without_pe_proffit = document.getElementById(
  "sell_without_pe_proffit"
);

const sell_with_pe = document.getElementById("sell_with_pe");
const sell_without_pe = document.getElementById("sell_without_pe");

// Currency Formater
const currency_format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 2,
});

add_buy_item.addEventListener("click", function () {
  f_add_buy_item();
});

// Templates
function t_buy_item() {
  t = "<div>";
  t +=
    "<input step=0.01 value=0 type='number' onkeyup='update_buy_result()' data-valor />";
  t +=
    "<input value=1 type='number' onkeyup='update_buy_result()' onchange='update_buy_result()' data-multi />";
  t += "<button onclick='remove_element(this.parentElement)'>Remover</button>";
  t += "</div>";
  return t;
}

// Add buy element to list
function f_add_buy_item() {
  buy_items_list.innerHTML += t_buy_item();

  update_buy_result();
}
f_add_buy_item();

// Utils
function remove_element(e) {
  e.remove();

  update_buy_result();
}

function update_buy_result() {
  // Load all input on list
  list = buy_items_list.querySelectorAll("input[data-valor]");
  // Set the start total
  total = 0;
  // Multiplicador
  mult = 0;

  // Calc total
  list.forEach((input) => {
    if (input.parentElement.querySelectorAll("input[data-multi]")) {
      mult = parseFloat(
        input.parentElement.querySelectorAll("input[data-multi]")[0].value
      );
    }

    input.setAttribute("value", parseFloat(input.value));
    total += parseFloat(input.value) * mult;
  });

  // Output results
  buy_total.innerHTML = currency_format.format(total);

  direct_sell_with_pe.innerHTML = currency_format.format(total * 0.845);
  direct_sell_without_pe.innerHTML = currency_format.format(total * 0.65);

  min_sell_with_pe.innerHTML = currency_format.format(total + total * 0.185);
  min_sell_without_pe.innerHTML = currency_format.format(total + total * 0.55);

  update_sell_result(total);
}

function update_sell_result(buy_value) {
  sell_value_info.innerHTML = currency_format.format(
    parseFloat(sell_value.value)
  );

  sell_with_pe_proffit.innerHTML = currency_format.format(
    parseFloat(sell_value.value) * parseFloat(sell_qtd.value) * 0.845 -
      buy_value
  );
  sell_without_pe_proffit.innerHTML = currency_format.format(
    parseFloat(sell_value.value) * parseFloat(sell_qtd.value) * 0.65 - buy_value
  );

  sell_with_pe.innerHTML = currency_format.format(
    parseFloat(sell_value.value) * parseFloat(sell_qtd.value) * 0.845
  );
  sell_without_pe.innerHTML = currency_format.format(
    parseFloat(sell_value.value) * parseFloat(sell_qtd.value) * 0.65
  );
}

// Small calculator
const smallcalc = document.getElementById("smallcalc");
const smalcalcr = document.getElementById("smalcalcr");
const egg = Math.floor(Math.random() * 5);
const _11egg = Math.floor(Math.random() * 100)+"... ou será q é "+Math.floor(Math.random() * 100)+"? 🤔";

function f_smallcalc() {
  try {
    if (smallcalc.value.substring(0,3) == '">' || smallcalc.value.substring(0,4) == '<scr') {
        smalcalcr.innerHTML = "XSS";
        return;
    }

    smalcalcr.innerHTML = new Intl.NumberFormat('en-US', { maximumSignificantDigits: 3 }).format(eval(smallcalc.value));

    if (smallcalc.value == "1*1") {
      smalcalcr.innerHTML = _11egg;
    }
    if (smallcalc.value == "") {
      switch (egg) {
        case 0:
          smalcalcr.innerHTML = "7?";
          break;
        case 1:
          smalcalcr.innerHTML = "Calculando um provavel erro";
          break;
        case 2:
          smalcalcr.innerHTML = "Já fez sua doação esse mês?";
          break;
        case 3:
          smalcalcr.innerHTML = "Você quis dizer <b>Pi</b>?";
          break;
        case 4:
          smalcalcr.innerHTML =
            "Prejuizo nunca mais, compre agora BDO Market Helper por apenas $999,49";
          break;

        default:
          break;
      }
      return;
    }
  } catch (error) {
    smalcalcr.innerHTML = "...";
  }
}
