quantities <- c(10, 50, 100, 200, 300)

doc.server  <- c(40.267, 146.167, 289.534, 536.5, 848.234)
mail.server <- c(27.834, 67.6, 114.133, 178.7, 284.067)
note.server <- c(13.667, 27.8, 39.133, 60.6, 68.133)

doc.one  <- c(5.467, 19.133, 33.0, 81.6, 107.2)
mail.one <- c(5.6, 27.4, 41.467, 83.2, 116.6)
note.one <- c(4.53, 12.4, 23.0, 65.067, 66.733)

doc.each  <- c(8.867, 35.267, 61.667, 138.533, 200.067)
mail.each <- c(12.8, 59.333, 99.533, 133.400, 246.0)
note.each <- c(10.667, 48.4, 86.333, 157.533, 211.067)

# Plots for load times as fn of size of collection (# of items)
par(mfrow=c(1,3))
# Plot for Docs
plot(quantities, doc.server, type='b', pch=0, xlab='Quantity', ylab='Load Time (ms)', main='A. Documents')
lines(quantities, doc.each, type='b', pch=1)
lines(quantities, doc.one, type='b', pch=2)
legend('topleft', legend=c('Server', 'Key per Model', 'Key per Collection'), pch=c(0, 1, 2), inset=0.03)

# Plot for Mail
plot(quantities, mail.server, type='b', pch=0, xlab='Quantity', ylab='Load Time (ms)', main='B. Email', ylim=c(0, 300))
lines(quantities, mail.each, type='b', pch=1)
lines(quantities, mail.one, type='b', pch=2)
legend('topleft', legend=c('Server', 'Key per Model', 'Key per Collection'), pch=c(0, 1, 2), inset=0.03)

# Plot for Notes
plot(quantities, note.server, type='b', pch=0, xlab='Quantity', ylab='Load Time (ms)', main='C. Notes', ylim=c(0, 300))
lines(quantities, note.each, type='b', pch=1)
lines(quantities, note.one, type='b', pch=2)
legend('topleft', legend=c('Server', 'Key per Model', 'Key per Collection'), pch=c(0, 1, 2), inset=0.03)
