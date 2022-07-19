const context= require.context('./svg', false, /\.svg$/)


// ['./404.svg', './bug.svg']
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(context)