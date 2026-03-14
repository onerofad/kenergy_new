import { createMedia } from '@artsy/fresnel';
import './App.css';
import { BrowserRouter, Routes, Route, } from 'react-router';
import Home from './components/Home';
import Suppliers from './components/Suppliers';
import Items from './components/Items';
import Inventory from './components/Inventory';
import Register from './components/Register';
import Sales from './components/Sales';
import Reports from './components/Reports';
import Expense from './components/Expense';
import ExpenseReport from './components/ExpenseReport';
import PeriodicExpenseReport from './components/PeriodicExpenseReport';
import PeriodicSalesReport from './components/PeriodicSalesReport';
import PricePerKg from './components/PrixePerKg';


const {Media, MediaContextProvider} = createMedia({
  breakpoints: {
    mobile: 0,
    tablet: 768,
    computer: 1024
  }
})
function App() {
  return (
    <MediaContextProvider>
      <Media at='mobile'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home mobile />} />
            {/*<Route path='items' element={<Items />} />
            <Route path='register' element={<Register />} />
            <Route path='suppliers' element={<Suppliers />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='sales' element={<Sales />} />
            <Route path='reports' element={<Reports />} />
            <Route path='expense' element={<Expense />} />
            */}
          </Routes>
        </BrowserRouter>

      </Media>
      <Media greaterThan='mobile'>
        <BrowserRouter>
          <Routes>
            <Route index element={<Home />} />
            <Route path='register' element={<Register />} />
            <Route path='items' element={<Items />} />
            <Route path='suppliers' element={<Suppliers />} />
            <Route path='inventory' element={<Inventory />} />
            <Route path='sales' element={<Sales />} />
            <Route path='reports' element={<Reports />} />
            <Route path='expense' element={<Expense />} />
            <Route path='expense_report' element={<ExpenseReport />} />
            <Route path='periodic_expense_report' element={<PeriodicExpenseReport />} />
            <Route path='periodic_sales_report' element={<PeriodicSalesReport />} />
            <Route path='price' element={<PricePerKg />} />

          </Routes>
        </BrowserRouter>
      </Media>
    </MediaContextProvider>
  )
}

export default App;
