// Enquiry form: rendered from the Wix Forms schema, submitted through the Wix forms layer.
// Field names, order, required flags and the thank-you text all come from the Wix dashboard,
// so the owner can change them there without touching this file.
import { createFormStore, FORM_ERROR } from "/js/wix/form-store.js";

var root = document.getElementById("enquiry");
var FALLBACK = 'Sorry, the form didn\'t load. Please email <a href="mailto:info@strivecorpwellbeing.co.uk">info@strivecorpwellbeing.co.uk</a> or call 07793 458864.';

function esc(v) {
  return String(v == null ? "" : v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function inputType(c) {
  return { email: "email", url: "url", phone: "tel", password: "password", number: "number", date: "date", time: "time", datetime: "datetime-local" }[c] || "text";
}
function autocomplete(f) {
  return { CONTACTS_FIRST_NAME: "given-name", CONTACTS_LAST_NAME: "family-name", CONTACTS_EMAIL: "email", CONTACTS_PHONE: "tel", CONTACTS_COMPANY: "organization" }[f.identifier] || "";
}
function isFull(f) {
  return ["textarea", "checkboxGroup", "tags", "radio", "address", "checkbox"].indexOf(f.control) !== -1;
}

function fieldHtml(f, s) {
  var id = "f_" + f.target;
  var v = s.values[f.target];
  var req = f.required ? '<span class="sw-req" aria-hidden="true">*</span>' : "";
  var ro = f.readOnly ? " disabled" : "";
  var describedBy = ' aria-describedby="' + id + '_err' + (f.description ? " " + id + "_desc" : "") + '"';
  var reqAttr = f.required ? ' aria-required="true"' : "";
  var html = '<div class="sw-field' + (isFull(f) ? " sw-field--full" : "") + '" data-field="' + esc(f.target) + '">';

  switch (f.control) {
    case "textarea":
      html += '<label for="' + id + '">' + esc(f.label) + req + "</label>";
      html += '<textarea class="sw-textarea" id="' + id + '" name="' + esc(f.target) + '"' + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") +
        (f.validation && f.validation.maxLength ? ' maxlength="' + f.validation.maxLength + '"' : "") + ro + reqAttr + describedBy + ">" + esc(v || "") + "</textarea>";
      break;
    case "select":
      html += '<label for="' + id + '">' + esc(f.label) + req + "</label>";
      html += '<select class="sw-select" id="' + id + '" name="' + esc(f.target) + '"' + ro + reqAttr + describedBy + '><option value="">Choose one</option>';
      (f.choices || []).forEach(function (c) {
        html += '<option value="' + esc(c.value) + '"' + (v === c.value ? " selected" : "") + ">" + esc(c.label) + "</option>";
      });
      html += "</select>";
      break;
    case "radio":
    case "checkboxGroup":
    case "tags":
      var multi = f.control !== "radio";
      html += '<fieldset class="sw-checks"' + describedBy + "><legend>" + esc(f.label) + req + "</legend>";
      (f.choices || []).forEach(function (c, i) {
        var checked = multi ? (Array.isArray(v) && v.indexOf(c.value) !== -1) : v === c.value;
        html += '<label class="sw-check"><input type="' + (multi ? "checkbox" : "radio") + '" name="' + esc(f.target) + '" value="' + esc(c.value) + '" id="' + id + "_" + i + '"' + (checked ? " checked" : "") + ro + "><span>" + esc(c.label) + "</span></label>";
      });
      html += "</fieldset>";
      break;
    case "checkbox":
      html += '<label class="sw-check"><input type="checkbox" id="' + id + '" name="' + esc(f.target) + '"' + (v === true ? " checked" : "") + ro + reqAttr + describedBy + "><span>" + esc(f.label) + req + "</span></label>";
      break;
    case "payment":
    case "appointment":
    case "unknown":
    case "file":
    case "signature":
    case "address":
      html += "<label>" + esc(f.label) + '</label><p class="sw-hint">This question can\'t be answered here. Please mention it in your message.</p>';
      break;
    default:
      var ac = autocomplete(f);
      html += '<label for="' + id + '">' + esc(f.label) + req + "</label>";
      html += '<input class="sw-input" id="' + id + '" name="' + esc(f.target) + '" type="' + inputType(f.control) + '" value="' + esc(v || "") + '"' +
        (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : "") + (ac ? ' autocomplete="' + ac + '"' : "") + ro + reqAttr + describedBy + ">";
  }
  if (f.description) html += '<span class="sw-hint" id="' + id + '_desc">' + esc(f.description) + "</span>";
  html += '<span class="sw-error" id="' + id + '_err" role="alert"></span>';
  return html + "</div>";
}

var store = createFormStore({ formId: root.getAttribute("data-form-id") });
var built = false;
var formEl, btnEl, formErrEl;

function build(s) {
  var form = s.form;
  var stepId = form.steps && form.steps[s.step] ? form.steps[s.step].id : null;
  var fields = form.fields.filter(function (f) { return !stepId || !f.stepId || f.stepId === stepId; });
  var html = '<form class="sw-form" novalidate>';
  html += fields.map(function (f) { return fieldHtml(f, s); }).join("");
  html += '<div class="sw-form-error" role="alert"></div>';
  html += '<p class="sw-small sw-form-note">We use your details only to reply to your enquiry. See our <a class="sw-link" href="/privacy.html">privacy policy</a>.</p>';
  html += '<div class="sw-field--full"><button class="sw-btn sw-btn--cta" type="submit">' + esc(form.submitText || "Send message") + ' <span class="sw-arrow" aria-hidden="true">&rarr;</span></button></div>';
  html += "</form>";
  root.innerHTML = html;
  formEl = root.querySelector("form");
  btnEl = formEl.querySelector('button[type="submit"]');
  formErrEl = formEl.querySelector(".sw-form-error");

  formEl.addEventListener("input", onInput);
  formEl.addEventListener("change", onInput);
  formEl.addEventListener("focusout", function (e) {
    if (e.target.name && e.target.type !== "checkbox" && e.target.type !== "radio") store.validate(e.target.name);
  });
  formEl.addEventListener("submit", function (e) {
    var st = store.getState();
    if (st.form && st.step < st.form.steps.length - 1) store.next(e); else store.submit(e);
  });
  built = true;
}

function onInput(e) {
  var t = e.target;
  if (!t.name) return;
  if (t.type === "checkbox" && formEl.querySelectorAll('input[name="' + CSS.escape(t.name) + '"]').length > 1) {
    var vals = Array.prototype.slice.call(formEl.querySelectorAll('input[name="' + CSS.escape(t.name) + '"]:checked')).map(function (i) { return i.value; });
    store.setValue(t.name, vals);
  } else if (t.type === "checkbox") {
    store.setValue(t.name, t.checked);
  } else {
    store.setValue(t.name, t.value);
  }
}

function render(s) {
  if (s.outcome) {
    if (s.outcome.url) {
      if (s.outcome.newTab) window.open(s.outcome.url, "_blank", "noopener"); else window.location.href = s.outcome.url;
      return;
    }
    var msg = s.outcome.message ? String(s.outcome.message).split(/\n+/).map(function (l) { return '<p class="sw-body">' + esc(l) + "</p>"; }).join("")
      : '<p class="sw-body">Thanks. We\'ll be in touch within one working day.</p>';
    root.innerHTML = '<div class="sw-form-done" tabindex="-1"><span class="sw-label">Message sent</span><h2 class="sw-h2">Thank you.</h2>' + msg + "</div>";
    root.firstChild.focus();
    built = false;
    return;
  }
  if (!s.form) {
    if (s.errors && s.errors[FORM_ERROR]) root.innerHTML = '<p class="sw-body">' + FALLBACK + "</p>";
    return;
  }
  if (s.closed) {
    root.innerHTML = '<p class="sw-body">' + (s.form.disabledMessage ? esc(s.form.disabledMessage) : FALLBACK) + "</p>";
    built = false;
    return;
  }
  if (!built) build(s);

  // Update errors and busy state without re-rendering inputs.
  root.querySelectorAll("[data-field]").forEach(function (wrap) {
    var target = wrap.getAttribute("data-field");
    var err = s.errors[target] || "";
    var errEl = wrap.querySelector(".sw-error");
    if (errEl && errEl.textContent !== err) errEl.textContent = err;
    wrap.querySelectorAll("input, select, textarea").forEach(function (c) {
      if (err) c.setAttribute("aria-invalid", "true"); else c.removeAttribute("aria-invalid");
    });
  });
  var fe = (s.errors && s.errors[FORM_ERROR]) || "";
  if (formErrEl.textContent !== fe) formErrEl.textContent = fe;
  btnEl.disabled = !!s.loading;
  if (s.loading) btnEl.setAttribute("aria-busy", "true"); else btnEl.removeAttribute("aria-busy");
}

store.subscribe(render);
render(store.getState());
store.start();
