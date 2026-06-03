sap.ui.define([
    "sap/ui/core/library"
], function(CoreLib) {
    "use strict";

    const { ValueState } = CoreLib;

    return class ValidationHelper {

        constructor(oController) {
            this.View = oController.getView();
            this.ValueState = ValueState;
        };

        validateFieldGroup(sFieldGroupId, fnValidation, bFocusOnError = true) {
            const aNotValidControls = this.View.getControlsByFieldGroupId(sFieldGroupId).filter(oControl => {
                if (oControl.getRequired && !oControl._bNeedsRendering) {
                    return fnValidation ?
                        !fnValidation(oControl) :
                        oControl.getRequired() === false && !this.validateControl(oControl, null, false);
                }

                return false;
            });
            
            if (bFocusOnError) {
                aNotValidControls[0]?.focus();
            }
            return aNotValidControls.length === 0;
        };

        resetFieldGroup(sFieldGroupId) {
            this.View.getControlsByFieldGroupId(sFieldGroupId).forEach(oControl => this.resetControl(oControl));
        };

        validateControl(control, sErrorText, bFocusOnError = true) {
            const oControl = this._getControl(control);
            if (!oControl?.setValueState) {
                return true;
            }

            if (!sErrorText) {
                sErrorText = oControl.data?.("validationText") || "Не может быть пустым.";
            }

            let sValueState = this.ValueState.None;
            let sValueStateText = "";
            if ((oControl.getValue?.().length === 0 && !oControl.getSelectedItems) ||
                (oControl.getSelectedItems?.().length === 0)) {
                sValueState = this.ValueState.Error;
                sValueStateText = sErrorText;
            }

            oControl.setValueState(sValueState);

            if (sValueState === this.ValueState.Error) {
                oControl.setValueStateText(sValueStateText);
                if (bFocusOnError) {
                    oControl.focus?.();
                }
                return false;
            }

            return true;
        };

        resetControl(control) {
            const oControl = this._getControl(control);
            oControl.setValueState?.(this.ValueState.None);
        };

        _getControl(control) {
            if (typeof control === "string") {
                control = this.View.byId(control);
            }
            return control;
        }
    };
});

