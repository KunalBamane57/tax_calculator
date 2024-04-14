$(document).ready(function () {
    $("#taxCalculatorForm").on("submit", function (event) {
        event.preventDefault();

        // Get form values
        const ageRange = $("#ageRange").val();
        const income = parseFloat($("#income").val());
        const extraIncome = parseFloat($("#extraIncome").val());
        const deductions = parseFloat($("#deductions").val()) || 0;

        // Initialize form validity flag
        let formValid = true;

        // Validate age range
        if (!ageRange) {
            $("#ageRange").addClass("is-invalid");
            formValid = false;
        } else {
            $("#ageRange").removeClass("is-invalid");
        }

        // Validate income
        validateNumberField("#income", "#incomeError", income);

        // Validate extra income
        validateNumberField("#extraIncome", "#extraIncomeError", extraIncome);

        // Validate deductions
        validateNumberField("#deductions", "#deductionsError", deductions);

        // Validate form
        if (!formValid) {
            return;
        }

        // Calculate net income and tax
        const netIncome = income + extraIncome - deductions;
        let tax = 0;
        if (netIncome > 8) {
            const taxableIncome = netIncome - 8;

            if (ageRange === "<40") {
                tax = taxableIncome * 0.3;
            } else if (ageRange === "40-59") {
                tax = taxableIncome * 0.4;
            } else if (ageRange === "≥60") {
                tax = taxableIncome * 0.1;
            }
        }

        // Round tax and calculate net income after tax
        tax = parseFloat(tax.toFixed(2));
        const netIncomeAfterTax = netIncome - tax;

        // Display result in modal
        $("#resultModalBody").html(`
            <h5 class="inner-p">${netIncomeAfterTax.toFixed(2)} Lakhs</h5>
            <p>after tax deductions</p>
        `);
        $("#resultModal").modal("show");
    });

    function validateNumberField(inputId, errorIconId, value) {
        if (isNaN(value) || value < 0) {
            $(inputId).addClass("is-invalid");
            $(errorIconId).show(); // Show error icon
        } else {
            $(inputId).removeClass("is-invalid");
            $(errorIconId).hide(); // Hide error icon
        }
    }
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();

    $('input[type="text"]').on('input', function () {
        var value = $(this).val();
        if (!/^\d*\.?\d*$/.test(value)) { // Check if the input is not a number
            $(this).siblings('.info').show(); // Show the error message
        } else {
            $(this).siblings('.info').hide(); // Hide the error message if input is a number
        }
    });
});