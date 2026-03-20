import { useState } from 'react'

export default function CalculatorAverageDown() {
  const [purchases, setPurchases] = useState([])
  const [lotQuantity, setLotQuantity] = useState('')
  const [lotPrice, setLotPrice] = useState('')
  const [currentPrice, setCurrentPrice] = useState('')

  // Tambah data pembelian baru
  const handleAddPurchase = () => {
    if (!lotQuantity || !lotPrice) {
      alert('Mohon isi jumlah lot dan harga!')
      return
    }

    const quantity = parseFloat(lotQuantity) * 100 // 1 lot = 100 saham
    const price = parseFloat(lotPrice)

    if (quantity <= 0 || price <= 0) {
      alert('Jumlah lot dan harga harus lebih besar dari 0!')
      return
    }

    const newPurchase = {
      id: Date.now(),
      lot: parseFloat(lotQuantity),
      quantity: quantity,
      price: price,
      total: quantity * price
    }

    setPurchases([...purchases, newPurchase])
    setLotQuantity('')
    setLotPrice('')
  }

  // Hapus data pembelian
  const handleRemovePurchase = (id) => {
    setPurchases(purchases.filter(p => p.id !== id))
  }

  // Bersihkan semua data
  const handleClearAll = () => {
    setPurchases([])
    setCurrentPrice('')
    setLotQuantity('')
    setLotPrice('')
  }

  // Perhitungan
  const totalQuantity = purchases.reduce((sum, p) => sum + p.quantity, 0)
  const totalInvestment = purchases.reduce((sum, p) => sum + p.total, 0)
  const averagePrice = totalQuantity > 0 ? totalInvestment / totalQuantity : 0
  
  // Perhitungan berdasarkan harga saat ini
  const current = parseFloat(currentPrice) || 0
  const currentValue = totalQuantity * current
  const gainLoss = currentValue - totalInvestment
  const gainLossPercent = totalInvestment > 0 ? (gainLoss / totalInvestment) * 100 : 0
  const gainLossPerLot = totalQuantity > 0 ? gainLoss / (totalQuantity / 100) : 0

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(value)
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Kalkulator Average Down Saham</h1>
      </div>

      <div className="calculator-wrapper">
        {/* INPUT SECTION */}
        <div className="input-section">
          <h2>Input Data Pembelian</h2>

          <div className="input-group">
            <h3>Tambah Data Pembelian</h3>
            <div className="form-row">
              <div>
                <label htmlFor="lotQuantity">Jumlah Lot</label>
                <input
                  id="lotQuantity"
                  type="number"
                  value={lotQuantity}
                  onChange={(e) => setLotQuantity(e.target.value)}
                  placeholder="Contoh: 1"
                  step="0.01"
                  min="0"
                />
                <div className="tooltip-text">1 lot = 100 saham</div>
              </div>
              <div>
                <label htmlFor="lotPrice">Harga per Lembar (Rp)</label>
                <input
                  id="lotPrice"
                  type="number"
                  value={lotPrice}
                  onChange={(e) => setLotPrice(e.target.value)}
                  placeholder="Contoh: 5000"
                  step="1"
                  min="0"
                />
              </div>
            </div>
            <div className="button-group">
              <button className="btn-add" onClick={handleAddPurchase}>
                Tambah Pembelian
              </button>
            </div>
          </div>

          {/* Daftar Pembelian */}
          {purchases.length > 0 ? (
            <div className="input-list">
              {purchases.map((purchase, index) => (
                <div key={purchase.id} className="input-item">
                  <div className="input-item-info">
                    <div>
                      <div className="input-item-label">Pembelian #{index + 1}</div>
                      <div className="input-item-data">
                        {purchase.lot} Lot ({formatNumber(purchase.quantity)} saham)
                      </div>
                    </div>
                    <div>
                      <div className="input-item-label">Harga per Lembar</div>
                      <div className="input-item-data">{formatCurrency(purchase.price)}</div>
                    </div>
                    <div>
                      <div className="input-item-label">Total Investasi</div>
                      <div className="input-item-data">{formatCurrency(purchase.total)}</div>
                    </div>
                  </div>
                  <button
                    className="btn-remove"
                    onClick={() => handleRemovePurchase(purchase.id)}
                    title="Hapus pembelian ini"
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-state">
              Belum ada data pembelian. Silakan tambahkan pembelian pertama Anda!
            </div>
          )}

          {purchases.length > 0 && (
            <button className="clear-button" onClick={handleClearAll}>
              Bersihkan Semua
            </button>
          )}

          <div className="info-box">
            <strong>Panduan:</strong>
            <p>Average down adalah strategi membeli saham lagi dengan harga lebih rendah untuk mengurangi harga rata-rata. Contoh: beli 1 lot harga 5000, kemudian beli 1 lot harga 4000, maka average down = 4500.</p>
          </div>
        </div>

        {/* RESULT SECTION */}
        <div className="result-section">
          <h2>Hasil Kalkulasi</h2>

          <div className="result-item">
            <div className="result-label">Total Saham yang Dimiliki</div>
            <div className="result-value">{formatNumber(totalQuantity)}</div>
            <div className="result-subtext">{formatNumber(totalQuantity / 100)} Lot</div>
          </div>

          <div className="result-item">
            <div className="result-label">Total Investasi</div>
            <div className="result-value">{formatCurrency(totalInvestment)}</div>
          </div>

          <div className="result-item">
            <div className="result-label">Harga Rata-Rata (Average Down)</div>
            <div className="result-value">{formatCurrency(averagePrice)}</div>
            <div className="result-subtext">per lembar saham</div>
          </div>

          {/* Harga Saat Ini */}
          {purchases.length > 0 && (
            <>
              <div style={{ marginTop: '30px', paddingTop: '30px', borderTop: '2px solid rgba(255, 255, 255, 0.3)' }}>
                <div style={{ marginBottom: '15px' }}>
                  <label style={{ 
                    display: 'block', 
                    marginBottom: '8px',
                    color: 'rgba(255, 255, 255, 0.9)',
                    fontSize: '0.95em',
                    fontWeight: '600'
                  }}>
                    Harga Saham Saat Ini (Rp)
                  </label>
                  <input
                    type="number"
                    value={currentPrice}
                    onChange={(e) => setCurrentPrice(e.target.value)}
                    placeholder="Masukkan harga saat ini"
                    step="1"
                    min="0"
                    style={{
                      width: '100%',
                      padding: '12px',
                      border: '2px solid rgba(255, 255, 255, 0.3)',
                      borderRadius: '8px',
                      fontSize: '1em',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: 'white'
                    }}
                  />
                </div>

                {currentPrice && (
                  <>
                    <div className="result-item">
                      <div className="result-label">Nilai Saat Ini</div>
                      <div className="result-value">{formatCurrency(currentValue)}</div>
                    </div>

                    <div className="result-item">
                      <div className="result-label">Keuntungan / Kerugian</div>
                      <div className="result-value" style={{
                        color: gainLoss >= 0 ? '#4caf50' : '#ff9800'
                      }}>
                        {gainLoss >= 0 ? '+' : ''}{formatCurrency(Math.abs(gainLoss))}
                      </div>
                      <div className="result-subtext">
                        {gainLoss >= 0 ? 'Keuntungan' : 'Kerugian'} {Math.abs(gainLossPercent).toFixed(2)}% ({gainLossPerLot >= 0 ? '+' : ''}{formatCurrency(gainLossPerLot)}/lot)
                      </div>
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
