// Generated by CoffeeScript 1.6.2
(function() {
  var activateContact, contact, contact_el, els, id, messages, renderMessagesFor, style_el, _elID, _i, _len, _makeEl, _ref, _ref1;

  HTMLElement.prototype._style = function(style) {
    var k, v;

    for (k in style) {
      v = style[k];
      this.style[k] = v;
    }
    return this;
  };

  HTMLElement.prototype._text = function(text) {
    this.innerText = text;
    return this;
  };

  HTMLElement.prototype._html = function(html) {
    this.innerHTML = html;
    return this;
  };

  _elID = function(id) {
    return document.getElementById(id);
  };

  _makeEl = function(tag_name, kwargs) {
    var el, k, v;

    if (kwargs == null) {
      kwargs = {};
    }
    el = document.createElement(tag_name);
    for (k in kwargs) {
      v = kwargs[k];
      el.setAttribute(k, v);
    }
    return el;
  };

  renderMessagesFor = function(contact_messages) {
    var body_el, box, date_el, m, message_el, messages, _i, _j, _k, _len, _len1, _len2, _ref, _ref1, _results;

    messages = [];
    _ref = ['inbox', 'outbox'];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      box = _ref[_i];
      _ref1 = contact_messages[box];
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        m = _ref1[_j];
        messages.push({
          date: new Date(m.date),
          body: m.body,
          box: box
        });
      }
    }
    messages.sort(function(a, b) {
      return b.date - a.date;
    });
    els.message_list.innerHTML = '';
    _results = [];
    for (_k = 0, _len2 = messages.length; _k < _len2; _k++) {
      m = messages[_k];
      message_el = _makeEl('li');
      message_el.className = m.box;
      date_el = _makeEl('time');
      date_el._text(m.date.toISOString());
      body_el = _makeEl('p');
      body_el._text(m.body);
      message_el.appendChild(date_el);
      message_el.appendChild(body_el);
      _results.push(els.message_list.appendChild(message_el));
    }
    return _results;
  };

  activateContact = function(contact) {
    els.new_message_contact.value = contact;
    els.new_message_contact.removeAttribute('disabled');
    els.new_message_body.removeAttribute('disabled');
    els.submit_message.removeAttribute('disabled');
    return renderMessagesFor(messages);
  };

  els = {};

  els.left_panel = _makeEl('div', {
    id: 'left_panel'
  });

  els.left_panel._html('<ul id="contact_list"></ul>');

  els.right_panel = _makeEl('div', {
    id: 'right_panel'
  });

  els.right_panel._html("<form id=\"new_message\" method=\"POST\" action=\"/messages/\">\n    <input id=\"new_message_contact\" type=\"text\" name=\"contact\" disabled>\n    <textarea id=\"new_message_body\" name=\"body\" disabled></textarea>\n    <button id=\"submit_message\" disabled>Send</button>\n</form>\n<ol id=\"message_list\" reversed></ol>");

  document.body.appendChild(els.left_panel);

  document.body.appendChild(els.right_panel);

  _ref = ['contact_list', 'message_list', 'new_message_contact', 'new_message_body', 'submit_message'];
  for (_i = 0, _len = _ref.length; _i < _len; _i++) {
    id = _ref[_i];
    els[id] = _elID(id);
  }

  style_el = _makeEl('style');

  style_el._html("#left_panel {\n    float: left;\n    width: 200px;\n}\n#right_panel {\n    float: right;\n    width: calc(100% - 200px);\n}\n#new_message_contact, #new_message_body {\n    display: block;\n    width: 100%;\n}\n#submit_message {\n    float: right;\n}\n#contact_list li {\n    cursor      : pointer;\n}\n#contact_list li:hover {\n    background  : rgba(240,240,240,1);\n}\n#message_list {\n    margin-top  : 2em;\n}\n#message_list li {\n    clear       : both;\n    padding     : 0.5em 1em;\n}\n#message_list li.inbox {\n    background  : rgba(240,255,240,1);\n}\n#message_list li.outbox {\n    background  : rgba(240,240,255,1);\n}\n#message_list time {\n    float       : right;\n    color       : #888;\n}\n#message_list p {\n    margin      : 0;\n}");

  document.body.appendChild(style_el);

  _ref1 = window.DATA;
  for (contact in _ref1) {
    messages = _ref1[contact];
    contact_el = _makeEl('li');
    contact_el._text(contact);
    els.contact_list.appendChild(contact_el);
    contact_el.onclick = function() {
      localStorage.setItem('active_contact', contact);
      return activateContact(contact);
    };
  }

  (function() {
    var prev_active_contact;

    prev_active_contact = localStorage.getItem('active_contact');
    if (prev_active_contact) {
      return activateContact(prev_active_contact);
    }
  })();

}).call(this);