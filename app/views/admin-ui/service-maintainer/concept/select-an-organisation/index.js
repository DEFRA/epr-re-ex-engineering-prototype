const APPROVED = 'Approved'
const SUSPENDED = 'Suspended'
const PENDING = 'Pending'

function loadOrgData() {
	return [...Array(100)]
		.map((_, index) => {
			const status = (index % 5 === 0) ? PENDING : (index % 7 === 0) ? SUSPENDED : APPROVED
			return {
				name: [
					'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')[index % 25],
					['Industries', 'Ltd', 'Inc', 'UK'][Math.floor(index / 25) % 4]
				].join(' '),
				orgId: `00000${index + 1}`.slice(-6),
				status,
			}
		})
}

function GET(req, res, next) {
	const rawSearch = req.query?.['org-search']
	const searchTerm = (typeof rawSearch === 'string' ? rawSearch : '').trim().toLowerCase()

	const filterBySearchTerm = searchTerm.length
		? org => [org.name, org.orgId]
			.map(field => field.toLowerCase())
			.find(field => field.includes(searchTerm))
		: _ => true

	const filteredOrgs = loadOrgData()
		.map(rawOrg => ({
			name: rawOrg.name,
			orgId: rawOrg.orgId,
			status: rawOrg.status,
			statusColour: {
				[APPROVED]: 'green',
				[SUSPENDED]: 'red'
			}[rawOrg.status]
		}))
		.filter(filterBySearchTerm)

	res.locals.data['select-an-organisation'] = { orgs: filteredOrgs }
	res.locals.data['org-search'] = searchTerm

	next()
}

module.exports = { GET }
