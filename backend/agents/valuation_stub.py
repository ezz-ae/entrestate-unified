def indicative_yield(price:float,rent:float)->float:
    return round((rent/price)*100,2) if price else 0.0
