document.getElementById('calculator-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent page reload
    
    const mnavMultiple = parseFloat(document.getElementById('mnav-multiple').value);
    const btcYieldMultiple = parseFloat(document.getElementById('btc-yield-multiple').value);
    const tPeriod = parseFloat(document.getElementById('t-period').value);
    
    // Validation
    if (isNaN(mnavMultiple) || isNaN(btcYieldMultiple) || isNaN(tPeriod) ||
        mnavMultiple <= 1 || btcYieldMultiple <= 1 || tPeriod < 1) {
        alert('Please enter valid numbers: mNAV multiple >1, BTC yield multiple >1, T >=1.');
        return;
    }
    
    // Calculation: t = T * ln(mNAV_multiple) / ln(btc_yield_multiple)
    const lnMnav = Math.log(mnavMultiple);
    const lnBtcYield = Math.log(btcYieldMultiple);
    const totalMonths = tPeriod * (lnMnav / lnBtcYield);
    
    // Convert total months to months and days (assuming 30 days per month)
    const wholeMonths = Math.floor(totalMonths);
    const remainingDays = Math.round((totalMonths - wholeMonths) * 30);
    
    // Get current date dynamically
    let currentDate = new Date();
    // Add months and days to get expected cover date
    currentDate.setMonth(currentDate.getMonth() + wholeMonths);
    currentDate.setDate(currentDate.getDate() + remainingDays);
    
    // Format date to DD Month Name YYYY
    const day = String(currentDate.getDate()).padStart(2, '0');
    const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
    const year = currentDate.getFullYear();
    const expectedDate = `${day} ${monthName} ${year}`;
    
    // Format the result
    const monthsText = wholeMonths === 1 ? 'month' : 'months';
    const daysText = remainingDays === 1 ? 'day' : 'days';
    
    document.getElementById('months').textContent = `${wholeMonths} ${monthsText} and ${remainingDays} ${daysText}`;
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <h2 class="text-xl font-semibold text-green-800">Result:</h2>
        <p class="text-lg text-green-700">Months-to-Cover (t): <span id="months" class="font-bold">${wholeMonths} ${monthsText} and ${remainingDays} ${daysText}</span></p>
        <p class="text-lg text-green-700">Expected Cover Date: <span class="font-bold">${expectedDate}</span></p>
    `;
    resultDiv.classList.remove('hidden', 'opacity-0');
    resultDiv.classList.add('opacity-100');
});