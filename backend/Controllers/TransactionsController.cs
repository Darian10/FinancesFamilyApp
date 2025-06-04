using Microsoft.AspNetCore.Mvc;
using backend.Data;
using backend.Models;

namespace backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransactionsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransactionsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("all")]
        public IActionResult GetAll() => Ok(_context.Transactions.ToList());


        [HttpPost]
        public IActionResult Create(Transaction transaction)
        {
            _context.Transactions.Add(transaction);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetAll), new { id = transaction.Id }, transaction);
        }

        [HttpGet]
        public IActionResult GetTransactions([FromQuery] TransactionFilterDto filter)
        {
            var query = _context.Transactions
                .Where(t => t.Date >= filter.From && t.Date <= filter.To);

            if (!string.IsNullOrWhiteSpace(filter.Search))
            {
                query = query.Where(t => t.Description.Contains(filter.Search));
            }

            var totalCount = query.Count();

            var items = query
                .OrderByDescending(t => t.Date)
                .Skip((filter.Page - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToList();

            return Ok(new {
                items,
                totalPages = (int)Math.Ceiling((double)totalCount / filter.PageSize)
            });
        }

    }
}
