/* an item that contains icon, label and any input control, e.g. onyx.Checkbox, onyx.ToggleButton */
enyo.kind({
	name: "LabeledItem",
	published: {
		value: "",
		label: ""
	},
	components: [
		{name: "label", kind: "Control"},
		{name: "input", classes: "label-item-input"}
	],
	defaultKind: "onyx.Checkbox",
	create: function() {
		this.inherited(arguments);
		this.valueChanged();
		this.labelChanged();
	},
	labelChanged: function() {
		this.$.label.setContent(this.label);
	},
	getValue: function() {
		return this.$.input.getValue();
	},
	valueChanged: function() {
		this.$.input.setValue(this.value);
	}
});