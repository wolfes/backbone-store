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



# Bar plots for by-size data
bar.one.10    <- c(4.53, 5.6, 5.467)
bar.each.10   <- c(10.667, 12.8, 8.867)
bar.server.10 <- c(13.667, 27.834, 40.267)
bar.10 <- data.frame(one=bar.one.10, each=bar.each.10, server=bar.server.10)

bar.one.300    <- c(66.733, 116.6, 107.2)
bar.each.300   <- c(211.067, 246, 200.067)
bar.server.300 <- c(68.133, 284.067, 848.234)
bar.300 <- data.frame(one=bar.one.300, each=bar.each.300, server=bar.server.300)

# Plots!
par(mfrow=c(1,2))

barplot(as.matrix(bar.10), names=c('Per-Collection', 'Per-Model', 'Server'), beside=T, legend.text=c('Note', 'Email', 'Document'), ylab='Load time (ms)', main='A. 10-Item Collections', args.legend=list(x='topleft', inset=0.05))
barplot(as.matrix(bar.300), names=c('Per-Collection', 'Per-Model', 'Server'), beside=T, legend.text=c('Note', 'Email', 'Document'), ylab='Load time (ms)', main='B. 300-Item Collections', args.legend=list(x='topleft', inset=0.05))



# Save time data
each.all <- c(4.1, 13.1, 25.033, 48.9, 72.967)
each.one <- c(0.7, 0.733, 0.933, 1.067, 1.133)
one.all <- c(2.067, 7.133, 16.5, 32.3, 44.2)
one.one <- c(1.633, 6.533, 14.9, 30.6, 42.8)

par(mfrow=c(1,1))
plot(quantities, each.all, type='b', pch=0, xlab='Quantity', ylab='Save Time (ms)', main='Time to Save Collections to Storage')
lines(quantities, each.one, type='b', pch=1)
lines(quantities, one.all, type='b', pch=2)
lines(quantities, one.one, type='b', pch=3)
legend('topleft', legend=c('Per Model, All', 'Per Model, One', 'Per Coll., All', 'Per Coll., One'), pch=c(0, 1, 2, 3), inset=0.03)